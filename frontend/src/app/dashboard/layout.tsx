/** @format */
import { ReactNode } from 'react'
import { AuthProvider } from '@/context/auth-context'
import { SocketContextProvider } from '@/context/socket-context'
interface DashboarLayoutProps {
  children: ReactNode
}

const DashboarLayout = ({ children }: DashboarLayoutProps) => {
  return (
    <AuthProvider>
      <SocketContextProvider>
        <div>{children}</div>
      </SocketContextProvider>
    </AuthProvider>
  )
}

export default DashboarLayout
