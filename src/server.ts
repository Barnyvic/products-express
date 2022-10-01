import express from 'express'
import dotenv from 'dotenv'
import logger from 'morgan'
import UserRoute from './routers/UsersRouter'
import ProductRoutes from './routers/Product'
import cookieParser from 'cookie-parser'
import { verifyUser } from './middleware/Authenticate'
import handleError from './middleware/error-handler.middleware'
import { dbConnection } from './config/database'
dotenv.config()
const PORT = process.env.PORT || 4000

const app = express()
dbConnection()
app.use(logger('dev'))
app.use(cookieParser())
app.use(express.json())
app.use('/user', UserRoute)
app.use('/products', verifyUser, ProductRoutes)
app.use(handleError)

app.listen(PORT, () => {
    console.log(`Server Running: ${PORT}`)
})
