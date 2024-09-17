import { useEffect } from 'react'
import { useSocketContext } from '@/context/socket-context'
import useConversation from '@/lib/zustand/useConversation'

const useListenMessages = () => {
  const { socket } = useSocketContext()
  const { messages, setMessages } = useConversation()

  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      console.log(newMessage)
      setMessages([...messages, newMessage])
    })

    return () => {
      socket?.off('newMessage')
    }
  }, [socket, setMessages, messages])
}
export default useListenMessages
