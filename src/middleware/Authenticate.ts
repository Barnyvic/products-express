import Jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
const SecretKey: any = process.env.SECRET_KEY
import UserSchema from '../model/Usermodel'

interface IPayload {
    id?: string
    iat?: number
    exp?: number
}

export const verifyUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const Token = req.cookies.access_token
    if (!Token)
        return res.status(403).send({
            Message: `Oops Sorry You have to login before continuing....`,
        })
    try {
        const decyptUser = Jwt.verify(Token, SecretKey)
        const User = await UserSchema.findById((decyptUser as IPayload).id)
        if (User) {
            next()
        }
    } catch (error: any) {
        res.status(401).send(error.message)
    }
}
