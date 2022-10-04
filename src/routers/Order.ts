import express from 'express'
import {
    CreateOrder,
    getAllorders,
    getSingleOrder,
    UpdateOrder,
    DeleteOrder,
} from '../controllers/OrderController'

const OrderRoutes = express.Router()

OrderRoutes.route('/').post(CreateOrder).get(getAllorders)
OrderRoutes.route('/:id')
    .get(getSingleOrder)
    .put(UpdateOrder)
    .delete(DeleteOrder)

export default OrderRoutes
