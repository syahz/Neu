import React from 'react'
import useConversation from '@/lib/zustand/useConversation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSocketContext } from '@/context/socket-context'
type ConversationProps = {
  userId: string
  fullName: string
  profilePic: string
}

const Conversation = ({ userId, fullName, profilePic }: ConversationProps) => {
  const { selectedConversation, setSelectedConversation } = useConversation()
  const isSelected = selectedConversation?.userId === userId
  const { onlineUsers } = useSocketContext()
  const isOnline = onlineUsers.includes(userId)

  const handleSelectConversation = () => {
    setSelectedConversation({ userId, fullName, profilePic })
  }

  return (
    <div key={userId} className={`flex items-center gap-4 rounded-xl p-2 hover:bg-[#EBFF00]/50 ${isSelected ? 'bg-sky-500' : ''}`} onClick={handleSelectConversation}>
      <div>
        <Avatar className={`${isOnline ? 'border-2 border-green-700' : ''}`}>
          <AvatarImage src={profilePic} />
          <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      <span>{fullName}</span>
    </div>
  )
}

export default Conversation
