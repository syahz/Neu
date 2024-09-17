import express from 'express'
import { register, login, getAll } from '../controller/user-controller'

export const publicRouter = express.Router()
publicRouter.post('/api/register', register)
publicRouter.post('/api/login', login)
publicRouter.get('/api/users/:userId', getAll)
