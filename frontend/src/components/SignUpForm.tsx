'use client'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { SignUpRequest } from '@/types/auth'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import React from 'react'
import { CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import { useSignUp } from '@/services/api/auth/useSignUp'
import { useToastMessage } from '@/context/toast-context'
import { useFormik } from 'formik'
import { SignUpValidation } from '@/lib/validation/auth-validation'

const SignUpForm = () => {
  const router = useRouter()
  const signUpMutation = useSignUp()
  const { setMessage } = useToastMessage()
  const formik = useFormik<SignUpRequest>({
    initialValues: {
      username: '',
      fullName: '',
      gender: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: SignUpValidation,
    onSubmit: async (values: SignUpRequest) => {
      try {
        await signUpMutation.mutateAsync(values)
        setMessage('Users has been created successfully.')
        router.push('/')
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Errors!',
          description: error.response.data.errors || 'Something went wrong',
          duration: 4000
        })
      }
    }
  })
  const { handleSubmit, values, handleChange, setFieldValue, handleBlur, touched, errors } = formik

  const handleGender = (value: string) => {
    setFieldValue('gender', value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardContent>
        <div className='grid w-full items-center gap-4 font-archivo'>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='username'>Username</Label>
            <Input
              id='username'
              name='username'
              value={values.username}
              onChange={handleChange}
              variant={touched.username && errors.username ? 'destructive' : 'default'}
            />
            {touched.username && errors.username ? <div className='text-sm font-semibold text-red-500'>* {errors.username}</div> : null}
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='fullName'>FullName</Label>
            <Input
              id='fullName'
              name='fullName'
              value={values.fullName}
              onBlur={handleBlur}
              onChange={handleChange}
              variant={touched.fullName && errors.fullName ? 'destructive' : 'default'}
            />
            {touched.fullName && errors.fullName ? <div className='text-sm font-semibold text-red-500'>* {errors.fullName}</div> : null}
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='gender'>Gender</Label>
            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-1'>
                <Checkbox id='male' name='gender' checked={values.gender === 'male'} value='male' onCheckedChange={() => handleGender('male')} />
                <label htmlFor='male' className='font-medium'>
                  Male
                </label>
              </div>
              <div className='flex items-center gap-1'>
                <Checkbox id='female' name='gender' checked={values.gender === 'female'} value='female' onCheckedChange={() => handleGender('female')} />
                <label htmlFor='female' className='font-medium'>
                  Female
                </label>
              </div>
            </div>
            {errors.gender ? <div className='text-sm font-semibold text-red-500'>* {errors.gender}</div> : null}
          </div>
          <div className='relative flex flex-col space-y-1.5'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              name='password'
              className='mt-4'
              type='password'
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              variant={touched.password && errors.password ? 'destructive' : 'default'}
            />
            {touched.password && errors.password ? <div className='text-sm font-semibold text-red-500'>* {errors.password}</div> : null}
          </div>
          <div className='relative flex flex-col space-y-1.5'>
            <Label htmlFor='confirmPassword'>Confirm Password</Label>
            <Input
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              className='mt-4'
              value={values.confirmPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              variant={touched.confirmPassword && errors.confirmPassword ? 'destructive' : 'default'}
            />
            {touched.confirmPassword && errors.confirmPassword ? <div className='text-sm font-semibold text-red-500'>* {errors.confirmPassword}</div> : null}
          </div>
          <div className='flex items-center justify-between'>
            <div className='link'>
              <Link className='text-sm font-semibold' href={'/'}>
                <Label className='underline hover:cursor-pointer'>already have an account?</Label>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
      <Button className='mt-4 font-asap' type='submit' variant='warning'>
        Create Account
      </Button>
    </form>
  )
}

export default SignUpForm
