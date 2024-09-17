import React, { useEffect, useRef } from 'react'
import useListenMessages from '@/hooks/useListenMessages'
import useConversation from '@/lib/zustand/useConversation'
import Message from '@/app/dashboard/components/messages/Message'
import { useGetMessages } from '@/services/api/messages/useGetMessage'

const Messages = () => {
  const { selectedConversation } = useConversation()
  const { messages = [], isLoading, error } = useGetMessages()
  useListenMessages()
  const lastMessageRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading messages</div>

  return (
    <div className='flex-1 overflow-auto px-4 font-archivo'>
      {messages.length === 0 ? (
        <p className='text-center'>Send a message to start the conversation</p>
      ) : (
        messages.map((message: any, index: number) => (
          <div key={message.id} ref={index === messages.length - 1 ? lastMessageRef : null}>
            <Message
              position={message.receiverId === selectedConversation?.userId ? 'left' : 'right'}
              content={message.message}
              profilePic={selectedConversation?.profilePic || ''}
            />
          </div>
        ))
      )}
    </div>
  )
}

export default Messages
