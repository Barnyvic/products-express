import express from 'express'
import { CreateOrder, getAllorders } from '../controllers/OrderController'

const OrderRoutes = express.Router()

OrderRoutes.route('/').post(CreateOrder).get(getAllorders)

export default OrderRoutes
