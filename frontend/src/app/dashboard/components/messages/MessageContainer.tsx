/** @format */

import useConversation from '@/lib/zustand/useConversation'
import MessageInput from './MessageInput'
import Messages from './Messages'
import { useEffect } from 'react'
import Image from 'next/image'

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation()
  useEffect(() => {
    return () => setSelectedConversation(null)
  }, [setSelectedConversation])

  if (!selectedConversation) {
    return <NoChatSelected />
  }

  return (
    <div className='flex w-full flex-col'>
      <div className='mb-2 bg-[#FDC0FF] px-4 py-2 font-ibm_plex_mono font-medium'>
        <span>To: </span>
        <span>{selectedConversation.fullName}</span>
      </div>
      <Messages />
      <MessageInput />
    </div>
  )
}

export default MessageContainer

const NoChatSelected = () => {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className='flex flex-col items-center gap-2 px-4 text-center font-asap font-semibold sm:text-lg md:text-xl'>
        <Image src={'/img/noChat.svg'} width={300} height={300} alt='No Chat Image' />
        <p>Welcome 👋 </p>
        <p>Select a chat to start messaging</p>
      </div>
    </div>
  )
}
