import { Request, Response } from 'express'
import OrderSchema from '.././model/OrderModel'
import UserSchema from '../model/Usermodel'

async function CreateOrder(req: Request, res: Response) {
    const { itemId, userId, address, delivered, quantity } = req.body

    if (!(itemId && userId && address && delivered && quantity))
        return res.status(404).send({ message: 'Invalid Order' })
    try {
        const newOrder = await OrderSchema.create({
            user: userId,
            items: itemId,
            address: address,
            Delivered: delivered,
            Quantity: quantity,
        })
        res.send(newOrder)
    } catch (error: any) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
}

async function getAllorders(req: Request, res: Response) {
    try {
        const allOrders = await OrderSchema.find()
            .populate({ path: 'user', select: 'UserName _id' })
            .populate({
                path: 'items',
                select: '_id ProductCode Title Description Price',
            })
            .sort({ createdAt: -1 })
        res.status(200).send(allOrders)
    } catch (error: any) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
}

async function getSingleOrder(req: Request, res: Response) {
    const id = req.params.id
    try {
        const user = await UserSchema.findOne({ _id: id })

        const Order = await OrderSchema.find({ user: user })
            .populate({ path: 'user', select: 'UserName _id' })
            .populate({
                path: 'items',
                select: '_id ProductCode Title Description Price',
            })
        res.status(200).send(Order)
    } catch (error: any) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
}

async function UpdateOrder(req: Request, res: Response) {
    const { address, delivered, quantity } = req.body
    const id = req.params.id
    try {
        const updateOrder = await OrderSchema.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    address: address,
                    Delivered: delivered,
                    Quantity: quantity,
                },
            },
            { new: true }
        )
        res.status(200).send({
            message: 'Order successfully updated',
            data: updateOrder,
        })
    } catch (error: any) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
}

async function DeleteOrder(req: Request, res: Response) {
    const OrderID = req.params.id
    try {
        await OrderSchema.findByIdAndDelete({ _id: OrderID })
        res.status(200).send({ message: 'Product deleted successfully' })
    } catch (error: any) {
        console.log(error.message)
        res.status(500).send({ error: error.message })
    }
}

export { CreateOrder, getAllorders, getSingleOrder, UpdateOrder, DeleteOrder }
