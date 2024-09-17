/** @format */

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type MessageProps = {
  position: 'left' | 'right'
  content: string
  profilePic: string
}

const Message = ({ position, content, profilePic }: MessageProps) => {
  const messageClass = position === 'right' ? 'justify-end rounded-br-none' : 'justify-start rounded-bl-none'
  const avatarOrderClass = position === 'right' ? 'order-last' : 'order-first'

  return (
    <div className={`mx-2 my-4 flex font-medium ${messageClass}`}>
      <div className='flex items-center gap-3'>
        <Avatar className={`${avatarOrderClass}`}>
          <AvatarImage src={profilePic} alt='User profile picture' />
          <AvatarFallback>{profilePic ? '' : 'U'}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-2'>
          <p className={`Message rounded-lg bg-yellow-200 px-2 py-1 text-sm drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] ${messageClass} flex justify-center`}>{content}</p>
          <span className={`flex text-xs text-muted-foreground ${messageClass}`}>Delivered</span>
        </div>
      </div>
    </div>
  )
}

export default Message
