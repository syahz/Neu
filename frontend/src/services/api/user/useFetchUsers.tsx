import { useQuery } from 'react-query'
import axiosInstance from '@/lib/axios'
import { UserResponse } from '@/types/user'

const fetchUsers = async (userId: string): Promise<UserResponse[]> => {
  try {
    const response = await axiosInstance.get(`/api/users/${userId}`)

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const useFetchUsers = (userId: string) => {
  const { data, error, isLoading } = useQuery(['fetch.users', userId], () => fetchUsers(userId))
  return { data, error, isLoading }
}
