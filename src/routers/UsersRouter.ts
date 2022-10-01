import express from 'express'
import { CreateUser, Login } from '../controllers/usersController'

const UserRoute = express.Router()

UserRoute.post('/register', CreateUser)
UserRoute.post('/login', Login)

export default UserRoute
