import { Validation } from '../validation/validation'
import { prismaClient } from '../application/database'
import { ResponseError } from '../error/response-error'
import { SendMessageRequest } from '../models/message-model'
import { MessageValidation } from '../validation/message-validation'
import { getReceiverSocketId, io } from '../application/socket'
export class MessageService {
  static async getMessage(senderId: string, receiverId: string) {
    try {
      const message = await prismaClient.message.findMany({
        where: {
          OR: [
            { senderId, receiverId },
            { senderId: receiverId, receiverId: senderId }
          ]
        },
        orderBy: {
          createdAt: 'asc'
        },
        select: {
          id: true,
          senderId: true,
          receiverId: true,
          message: true,
          createdAt: true,
          updatedAt: true
        }
      })

      return message
    } catch (error) {
      throw new ResponseError(400, 'Error On Message Service Get Message')
    }
  }

  static async sendMessage(senderId: string, receiverId: string, request: SendMessageRequest) {
    const messageRequest = Validation.validate(MessageValidation.SENDMESSAGE, request)

    // Cari conversation participant
    let conversationParticipant = await prismaClient.conversationParticipant.findFirst({
      where: {
        userId: senderId,
        conversation: {
          participants: {
            some: { userId: receiverId }
          }
        }
      },
      include: {
        conversation: true
      }
    })

    let conversationId: string
    if (!conversationParticipant) {
      // Jika belum ada conversation, buat baru
      const newConversation = await prismaClient.conversation.create({
        data: {
          participants: {
            createMany: {
              data: [{ userId: senderId }, { userId: receiverId }]
            }
          }
        }
      })

      conversationId = newConversation.id
    } else {
      conversationId = conversationParticipant.conversation.id
    }

    // Buat pesan baru
    const newMessage = await prismaClient.message.create({
      data: {
        senderId,
        receiverId,
        conversationId: conversationId,
        message: messageRequest.message
      }
    })

    // Dapatkan socketId penerima
    const receiverSocketId = getReceiverSocketId(receiverId)

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage)
    }

    return newMessage
  }
}
