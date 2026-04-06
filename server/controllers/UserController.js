import { Webhook } from 'svix'
import userModel from '../models/userModel.js'
import Stripe from "stripe"
import transactionModel from '../models/transactionModel.js'

//API Controller Function to Manage Clerk with databse
//http://localhost:4000/api/user/webhooks
const clerkWebhooks = async (req, res) => {
    try {
        //Create a Svix instance with clerk webhook secret.
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        const { data, type } = req.body

        switch (type) {
            case "user.created": {

                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url
                }
                await userModel.create(userData)
                res.json({})

                break;
            }
            case "user.updated": {

                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url
                }
                await userModel.findOneAndUpdate({ clerkId: data.id }, userData)
                res.json({})

                break;
            }
            case "user.deleted": {

                await userModel.findOneAndDelete({ clerkId: data.id })
                res.json({})

                break;
            }

            default:
                break;
        }


    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}




//API Controller function to get user available cedits data
const userCredits = async (req, res) => {
    try {

        const clerkId = req.clerkId

        const userData = await userModel.findOne({ clerkId })

        if (!userData) {
            return res.json({ success: false, message: 'User not found' })
        }

        res.json({ success: true, credits: userData.creditBalance })


    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

//API to make payment for credits
const paymentStripe = async (req, res) => {
    try {
        const stripeInstance = new Stripe(process.env.STRIPE_KEY_SECRET)
        const { planId } = req.body
        const clerkId = req.clerkId
        const userData = await userModel.findOne({ clerkId })

        if (!userData || !planId) {
            return res.json({ success: false, message: 'Invalid Credentials' })
        }

        let credits, plan, amount, date

        switch (planId) {
            case 'Basic':
                plan = 'Basic'
                credits = 100
                amount = 10
                break;

            case 'Advanced':
                plan = 'Advanced'
                credits = 500
                amount = 50
                break;

            case 'Business':
                plan = 'Business'
                credits = 5000
                amount = 250
                break;

            default:
                return res.json({ success: false, message: 'Invalid Plan' })
        }

        date = Date.now()

        //Creating Transaction
        const transactionData = {
            clerkId,
            plan,
            amount,
            credits,
            date
        }

        const newTransaction = await transactionModel.create(transactionData)

        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: plan + ' Plan',
                    },
                    unit_amount: amount * 100,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/cancel`,
            metadata: {
                clerkId,
                planId,
                transactionId: newTransaction._id.toString()
            }
        })

        res.json({ success: true, order: { session_url: session.url } })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

//API to verify payment and update credits
const verifyPayment = async (req, res) => {
    try {
        const stripeInstance = new Stripe(process.env.STRIPE_KEY_SECRET)
        const { sessionId } = req.body
        const clerkId = req.clerkId

        if (!sessionId) {
            return res.json({ success: false, message: 'Session ID is required' })
        }

        const session = await stripeInstance.checkout.sessions.retrieve(sessionId)

        if (session.payment_status === 'paid') {
            const transactionId = session.metadata.transactionId

            //Update transaction status
            await transactionModel.findByIdAndUpdate(transactionId, { payment: true })

            //Update user credits
            const userData = await userModel.findOne({ clerkId })
            const transaction = await transactionModel.findById(transactionId)

            if (userData && transaction) {
                await userModel.findByIdAndUpdate(userData._id, {
                    creditBalance: userData.creditBalance + transaction.credits
                })

                return res.json({ success: true, message: 'Credits updated successfully' })
            } else {
                return res.json({ success: false, message: 'User or transaction not found' })
            }
        } else {
            return res.json({ success: false, message: 'Payment not completed' })
        }

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}


export { clerkWebhooks, userCredits, paymentStripe, verifyPayment }
