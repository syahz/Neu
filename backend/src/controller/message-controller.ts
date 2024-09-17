import { Request, Response, NextFunction } from 'express'
import { MessageService } from '../services/message-service'
import { SendMessageRequest } from '../models/message-model'
export const getMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const senderId = req.params.senderId
    const receiverId = req.params.receiverId
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    if (!uuidRegex.test(senderId && receiverId) || senderId === receiverId) {
      res.status(400).send({ message: 'Invalid UUID format for Sender Id or Receiver Id' })
      return
    }
    const response = await MessageService.getMessage(senderId, receiverId)
    res.status(200).json({
      data: response
    })
  } catch (e) {
    next(e)
  }
}

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const senderId = req.params.senderId
    const receiverId = req.params.receiverId
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    if (!uuidRegex.test(senderId && receiverId) || senderId === receiverId) {
      res.status(400).send({ message: 'Invalid UUID format for Sender Id or Receiver Id' })
      return
    }

    const request: SendMessageRequest = req.body as SendMessageRequest
    const response = await MessageService.sendMessage(senderId, receiverId, request)
    res.status(201).json({
      data: response
    })
  } catch (e) {
    next(e)
  }
}
