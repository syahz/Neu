'use client'
import React, { useState } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import { CardContent } from '@/components/ui/card'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { LoginValidation } from '@/lib/validation/auth-validation'
import { signIn } from 'next-auth/react'
import { toast } from '@/hooks/use-toast'

interface LoginFormValues {
  username: string
  password: string
}

const LoginForm = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: LoginValidation,
    onSubmit: async (values) => {
      const result = await signIn('credentials', {
        redirect: false,
        username: values.username,
        password: values.password
      })

      if (result?.error) {
        const errResponse = result.error == 'Username or password is wrong' ? 'Username or password is wrong' : 'Something went wrong'
        toast({
          variant: 'destructive',
          title: 'Errors!',
          description: errResponse,
          duration: 4000
        })
        setError(result.error)
      } else {
        setError(null)
        router.push('/dashboard')
      }
    }
  })

  const { handleSubmit, errors, touched, handleBlur, values, handleChange } = formik

  return (
    <form onSubmit={handleSubmit}>
      <CardContent>
        <div className='grid w-full items-center gap-4'>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='username'>Username</Label>
            <Input
              id='username'
              name='username'
              required
              onChange={handleChange}
              value={values.username}
              onBlur={handleBlur}
              variant={touched.username && errors.username ? 'destructive' : 'default'}
            />
            {touched.username && errors.username ? <div className='text-sm text-red-500'>{errors.username}</div> : null}
          </div>
          <div className='relative flex flex-col space-y-1.5'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              name='password'
              type='password'
              required
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
              variant={touched.password && errors.password ? 'destructive' : 'default'}
            />
            {touched.password && errors.password ? <div className='text-sm text-red-500'>{errors.password}</div> : null}
          </div>
          <div className='flex flex-col items-start justify-between xl:flex-row xl:items-center xl:justify-between'>
            <div className='flex items-center gap-2'>
              <Checkbox id='terms' />
              <Label htmlFor='terms' className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Remember Me!
              </Label>
            </div>
            <div className='link'>
              <Link className='text-sm font-semibold' href={'/signup'}>
                <Label className='underline hover:cursor-pointer'>Register Account</Label>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
      <Button className='mt-4 font-asap' type='submit' variant='warning'>
        Submit
      </Button>
    </form>
  )
}

export default LoginForm
