import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    items: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    address: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    Delivered: {
        type: Boolean,
        default: false,
    },
})

export default mongoose.model('Order', OrderSchema)
