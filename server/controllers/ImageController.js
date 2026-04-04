import axios from 'axios';
import fs from 'fs'
import FormData from 'form-data'
import userModel from "../models/userModel.js";

//Controller function to remove bg from image
const removeBgImage = async (req, res) => {
    try {

        const clerkId = req.clerkId

        const user = await userModel.findOne({ clerkId })

        if (!user) {
            return res.json({ success: false, message: 'User Not Found' })
        }

        if (user.creditBalance === 0) {
            return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance })
        }

        const imagePath = req.file.path;

        //Reading the image file
        const imageFile = fs.createReadStream(imagePath)

        const formData = new FormData()
        formData.append('image_file', imageFile)

        const { data } = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
            headers: {
                'X-API-Key': process.env.REMOVEBG_API
            },
            responseType: 'arraybuffer'
        })

        const bsae64Image = Buffer.from(data, 'binary').toString('base64')

        const resultImage = `data:${req.file.mimetype};base64,${bsae64Image}`

        const updatedUser = await userModel.findByIdAndUpdate(
            user._id,
            { creditBalance: user.creditBalance - 1 },
            { new: true }
        )

        res.json({ success: true, resultImage, creditBalance: updatedUser.creditBalance, message: 'Background Removed' })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export { removeBgImage }