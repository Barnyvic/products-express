import mongoose from 'mongoose'
export const dbConnection = async () => {
    const url = process.env.MONGODB_URL || 'mongodb://localhost:27017'
    try {
        await mongoose.connect(url)
        console.log('MONGODB CONNECTED SUCCESSFULLY!....')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
