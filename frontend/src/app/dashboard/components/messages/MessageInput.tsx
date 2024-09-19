/** @format */

import { toast } from '@/hooks/use-toast'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SendMessageRequest } from '@/types/message'
import { useState } from 'react'
import { Send } from 'lucide-react'
import { useGetMessages } from '@/services/api/messages/useGetMessage'
import { useSendMessage } from '@/services/api/messages/useSendMessage'

const MessageInput = () => {
  const [message, setMessage] = useState('')
  const sendMessageMutation = useSendMessage()
  const { refetch } = useGetMessages()

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!message) return

    const messageRequest: SendMessageRequest = {
      message: message
    }

    try {
      await sendMessageMutation.mutateAsync(messageRequest)
    } catch (error: any) {
      toast({
        variant: 'default',
        title: 'Errors!',
        description: 'Something went wrong',
        duration: 4000
      })
    }
    refetch()
    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex w-full items-center gap-2 p-2'>
        <Input placeholder='Aa' className='bg-[#FDC0FF]' value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button variant={'icons'} size={'icon'}>
          <Send width={15} height={15} />
        </Button>
      </div>
    </form>
  )
}

export default MessageInput
