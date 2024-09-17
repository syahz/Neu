import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useFetchUsers } from '@/services/api/user/useFetchUsers'
import { Search, LogOut } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import Conversation from '@/app/dashboard/components/conversation/Conversation'

const Sidebar = () => {
  const { data: session, status } = useSession()
  const { data: users } = useFetchUsers(session?.user?.id as string)

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'unauthenticated') return <div>Access Denied. You need to sign in.</div>

  return (
    <div className='me-2 flex min-w-full cursor-pointer flex-col gap-2 p-4 lg:w-1/3'>
      {/* <div className='hidden items-center gap-2 lg:flex'>
        <Input className='font-ibm_plex_mono' placeholder='Search' />
        <Button variant={'success'} size={'icon'}>
          <Search width={15} height={15} />
        </Button>
      </div> */}
      <ScrollArea className='h-full w-full xl:w-80'>
        <div className='flex flex-col gap-4 p-4 font-ibm_plex_mono font-medium'>
          {users?.map((user: { userId: string; fullName: string; username: string; profilePic: string }) => (
            <Conversation userId={user.userId} fullName={user.fullName} profilePic={user.profilePic} key={user.userId} />
          ))}
        </div>
      </ScrollArea>
      <Button variant={'warning'} size={'sm'} className='flex w-24 gap-2' onClick={() => signOut({ callbackUrl: '/' })}>
        <LogOut width={14} height={14} className='rotate-180' />
        <span className='text-sm'>Logout</span>
      </Button>
    </div>
  )
}

export default Sidebar
