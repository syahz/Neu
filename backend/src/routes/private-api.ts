import express from 'express'
import { getMessage, sendMessage } from '../controller/message-controller'

export const privateRouter = express.Router()
privateRouter.post('/api/messages/send/:senderId/:receiverId', sendMessage)
privateRouter.get('/api/messages/:senderId/:receiverId', getMessage)
