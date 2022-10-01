import UserSchema from '../model/Usermodel'
import bcrypt, { genSalt } from 'bcrypt'
import dotenv from 'dotenv'
import Jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

dotenv.config()
const SecretKey: any = process.env.SECRET_KEY

// Create a new User

const CreateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { UserName, Email, Password } = req.body

    if (!(UserName && Email && Password))
        return res.status(409).send({
            message: 'Please enter your usernames email and passwords',
        })
    try {
        const hashedPassword = await bcrypt.hash(Password, await genSalt(10))

        const User = await UserSchema.create({
            USERNAME: UserName,
            EMAIL: Email,
            PASSWORD: hashedPassword,
        })
        return res
            .status(201)
            .send({ message: 'User has been created successfully' })
    } catch (error: any) {
        console.log(error.message)
        res.status(500).send({
            message: error.message,
        })
    }
}

const Login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { Email, Password } = req.body
        if (!(Email && Password))
            return res
                .status(500)
                .send({ message: 'Password and Email is required' })
        const User = await UserSchema.findOne({ EMAIL: Email })
        if (!User)
            return res
                .status(409)
                .send({ message: 'User Not Found Pls Register' })
        if (User && (await bcrypt.compare(Password, User?.PASSWORD))) {
            const Token = Jwt.sign({ id: User._id }, SecretKey, {
                expiresIn: '2h',
            })
            return res
                .cookie('access_token', Token, {
                    httpOnly: true,
                })
                .status(200)
                .send({ message: 'Login successful' })
        } else return res.status(401).send({ message: 'Invalid password' })
    } catch (error: any) {
        console.log(error.message)
    }
}

export { CreateUser, Login }
