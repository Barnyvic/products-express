import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    cart: {
        totalQty: {
            type: Number,
            default: 0,
            required: true,
        },
        totalCost: {
            type: Number,
            default: 0,
            required: true,
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                },
                qty: {
                    type: Number,
                    default: 0,
                },
                price: {
                    type: Number,
                    default: 0,
                },
                title: {
                    type: String,
                },
                productCode: {
                    type: String,
                },
            },
        ],
    },
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
