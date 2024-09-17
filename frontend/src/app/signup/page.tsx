import React from 'react'
import { Card } from '@/components/ui/card'
import SignUpForm from '@/components/SignUpForm'

const SignUp = () => {
  return (
    <div className='flex h-screen items-center justify-center p-4'>
      <Card className='relative w-[450px] px-3 pb-10 pt-20 sm:px-14 sm:pb-12 sm:pt-20'>
        <div className='absolute -top-8 right-6 flex h-16 w-32 items-center justify-center rounded-xl border border-black bg-[#FDC0FF] font-archivo font-black shadow-[5px_5px_0px_rgba(0,0,0,1)]'>
          <span className='text-2xl drop-shadow-[1px_4px_0px_rgba(255,255,255,1)]'>SignUp</span>
        </div>
        <SignUpForm />
      </Card>
    </div>
  )
}

export default SignUp
