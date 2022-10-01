import mongoose, { Document } from 'mongoose'

export interface IPRODUCT {
    ProductCode: String
    Title: String
    ImagePath: String
    Description: String
    Price: String
    Manufacturer: String
    Available: String
    CreatedAt: Date
}

export interface IIPRODUCTSMODEL extends IPRODUCT, Document {}

const ProductShema = new mongoose.Schema({
    ProductCode: {
        type: String,
        required: true,
        unique: true,
    },
    Title: {
        type: String,
        required: true,
    },
    ImagePath: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Price: {
        type: String,
        required: true,
    },
    Manufacturer: {
        type: String,
    },
    Available: {
        type: String,
        enum: ['true', 'false'],
        required: true,
    },
    CreatedAt: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.model<IPRODUCT>('Product', ProductShema)
