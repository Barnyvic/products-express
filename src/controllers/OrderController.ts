import { Request, Response } from 'express'
import OrderSchema from '.././model/OrderModel'

async function CreateOrder(req: Request, res: Response) {
    const { itemId, userId, address, delivered } = req.body
    if (!(itemId && userId && address && delivered))
        return res.status(404).send({ message: 'Invalid Order' })
    try {
        const newOrder = await OrderSchema.create({
            user: userId,
            items: itemId,
            address: address,
            Delivered: delivered,
        })
        res.send(newOrder)
    } catch (error: any) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
}

async function getAllorders(req: Request, res: Response) {
    try {
        const allOrders = await OrderSchema.find({})
            .populate({ path: 'user', select: 'UserName _id' })
            .populate({
                path: 'items',
                select: '_id ProductCode Title Description Price',
            })
        res.status(200).send(allOrders)
    } catch (error: any) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
}

export { CreateOrder, getAllorders }
