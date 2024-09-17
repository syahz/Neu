import axiosInstance from '@/lib/axios'
import { useMutation } from 'react-query'
import { SendMessageRequest } from '@/types/message'
import { useSession } from 'next-auth/react'
import useConversation from '@/lib/zustand/useConversation'

const mutateSendMessage = async (message: SendMessageRequest, senderId: string, receiverId: string, messages: any[], setMessages: (messages: any[]) => void) => {
  try {
    const response = await axiosInstance.post(`/api/messages/send/${senderId}/${receiverId}`, message)

    const newMessage = response.data
    setMessages([...messages, newMessage])

    return response
  } catch (error) {
    throw error
  }
}

export const useSendMessage = () => {
  const { data: dataUser } = useSession()
  const { selectedConversation, setMessages, messages } = useConversation()
  const senderId = dataUser?.user.id as string
  const receiverId = selectedConversation?.userId as string
  return useMutation((values: SendMessageRequest) => mutateSendMessage(values, senderId, receiverId, messages, setMessages))
}
