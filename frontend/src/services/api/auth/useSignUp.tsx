import axiosInstance from '@/lib/axios'
import { useMutation } from 'react-query'
import { SignUpRequest } from '@/types/auth'

const mutateSignUp = async (values: SignUpRequest) => {
  try {
    const response = await axiosInstance.post('/api/register', values)
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const useSignUp = () => {
  return useMutation(mutateSignUp)
}
