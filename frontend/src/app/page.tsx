/** @format */
'use client'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import LoginForm from '@/components/LoginForm'
import Image from 'next/image'
import { useToastMessage } from '@/context/toast-context'
import { useEffect } from 'react'

export default function Home() {
  const { toast } = useToast()
  const { message, setMessage } = useToastMessage()

  useEffect(() => {
    if (message != null) {
      toast({
        title: 'Success!',
        description: message,
        duration: 900
      })
    }
    setMessage(null)
  }, [message, toast, setMessage])

  return (
    <div className='bg-[#FFFFE8]'>
      <div className='container flex h-screen w-full items-center justify-between gap-6'>
        <Card className='relative w-[450px] px-3 pb-10 pt-20 sm:px-14 sm:pb-12 sm:pt-20'>
          <div className='absolute -top-8 right-6 flex h-16 w-32 items-center justify-center rounded-xl border border-black bg-[#FDC0FF] font-archivo font-black shadow-[5px_5px_0px_rgba(0,0,0,1)]'>
            <span className='text-2xl drop-shadow-[1px_4px_0px_rgba(255,255,255,1)]'>Login</span>
          </div>
          <div className='absolute -left-10 -top-11 hidden h-16 w-32 md:block'>
            <Image src='/img/sticker.svg' width={700} height={700} alt='Top Sticker' />
          </div>
          <div className='absolute -bottom-2 -right-12 hidden h-16 w-32 md:block'>
            <Image src='/img/sticker.svg' width={700} height={700} alt='Bottom Sticker' />
          </div>
          <LoginForm />
        </Card>
        {/* batas */}
        <div className='hidden md:block'>
          <Image src='/img/imglogin.svg' width={700} height={700} alt='Picture of the author' />
        </div>
      </div>
    </div>
  )
}
