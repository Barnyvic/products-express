import mongoose, { Document } from 'mongoose'

export interface IUSERS {
    USERNAME: string
    EMAIL: string
    PASSWORD: string
}

export interface IUSERSMODEL extends IUSERS, Document {}

const UserSchema = new mongoose.Schema(
    {
        USERNAME: {
            type: String,
            require: true,
        },
        EMAIL: {
            type: String,
            require: true,
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid E-mail',
            ],
        },
        PASSWORD: {
            type: String,
            require: true,
            minlength: [6, 'Password must be at least 6 characters long'],
        },
    },
    { timestamps: true }
)

export default mongoose.model<IUSERSMODEL>('User', UserSchema)
