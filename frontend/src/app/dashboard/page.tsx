'use client'
import React from 'react'
import Sidebar from '@/app/dashboard/components/Sidebar'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/context/auth-context'
import MessageContainer from '@/app/dashboard/components/messages/MessageContainer'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const Dashboard = () => {
  const { user, loading } = useAuth()
  if (loading) {
    return <>loading ...</>
  }
  return (
    <div className='flex h-screen flex-col items-center justify-center bg-[#FFFFE8] py-4'>
      <div className='m-4 flex flex-col items-end drop-shadow-[7px_7px_0px_rgba(0,0,0,1)]'>
        <div className='flex w-full items-center justify-between gap-4 md:justify-end'>
          <div className='flex h-9 w-auto items-center justify-center border border-b-0 border-black bg-yellow-300 px-5 font-asap font-medium hover:bg-yellow-100 md:hidden'>
            <div className='sheet'>
              <Sheet>
                <SheetTrigger>Open</SheetTrigger>
                <SheetContent side={'left'} className='h-full'>
                  <Sidebar />
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <div className='flex h-9 w-32 items-center justify-center rounded-t-lg border border-b-0 border-black bg-destructive font-asap font-medium'>chat app</div>
        </div>
        <Card className='h-full max-h-[80vh] min-h-11 flex-grow rounded-tl-none rounded-tr-none shadow-none sm:w-[500px] lg:min-h-[80vh] lg:w-[800px] lg:rounded-tl-xl xl:w-[1000px]'>
          <CardContent className='h-full'>
            <div className='flex h-full divide-x-0 lg:divide-x lg:divide-gray-500'>
              <div className='hidden lg:flex'>
                <Sidebar />
              </div>
              <MessageContainer />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
