import express from 'express'
import { clerkWebhooks, paymentStripe, userCredits, verifyPayment } from '../controllers/UserController.js'
import authUser from '../middlewares/auth.js'

const userRouter = express.Router()

userRouter.post('/webhooks',clerkWebhooks)
userRouter.get('/credits',authUser,userCredits)
userRouter.post('/pay-stripe',authUser,paymentStripe)
userRouter.post('/verify-payment',authUser,verifyPayment)

export default userRouter