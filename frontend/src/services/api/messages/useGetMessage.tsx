import axiosInstance from '@/lib/axios'
import useConversation from '@/lib/zustand/useConversation'
import { useQuery } from 'react-query'
import { useSession } from 'next-auth/react'

const getMessages = async (senderId: string, receiverId: string) => {
  try {
    const response = await axiosInstance.get(`/api/messages/${senderId}/${receiverId}`)
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const useGetMessages = () => {
  const { data: dataUser } = useSession()
  const { selectedConversation, messages, setMessages } = useConversation()

  const senderId = dataUser?.user.id as string
  const receiverId = selectedConversation?.userId as string

  const { data, error, isLoading, refetch } = useQuery(['fetch.messages', senderId, receiverId], () => getMessages(senderId, receiverId), {
    enabled: !!senderId && !!receiverId,
    onSuccess: (data) => {
      setMessages(data)
    }
  })

  return { messages, data, error, isLoading, refetch }
}
