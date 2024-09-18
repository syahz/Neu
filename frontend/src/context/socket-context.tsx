'use client'
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react'
import { useAuth } from './auth-context'
import io, { Socket } from 'socket.io-client'

interface SocketContextType {
  socket: Socket | null
  onlineUsers: string[]
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

export const useSocketContext = (): SocketContextType => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocketContext must be used within a SocketContextProvider')
  }
  return context
}

interface SocketContextProviderProps {
  children: ReactNode
}

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])
  const { user: authUser } = useAuth()
  const socketUrl = process.env.REACT_APP_API_BASE_URL as string

  useEffect(() => {
    if (authUser) {
      const newSocket = io('https://chat-app.ingsun.co', {
        path: '/backend/socket.io',
        query: {
          userId: authUser.id
        }
      })

      setSocket(newSocket)

      newSocket.on('getOnlineUsers', (users: string[]) => {
        setOnlineUsers(users)
      })

      // Cleanup function
      return () => {
        newSocket.close()
      }
    }

    // Cleanup if no authUser
    return () => {
      if (socket) {
        socket.close()
        setSocket(null)
      }
    }
  }, [authUser])

  return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>
}
