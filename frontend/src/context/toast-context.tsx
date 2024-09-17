'use client'
import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react'

interface ToastContextType {
  message: string | null
  setMessage: Dispatch<SetStateAction<string | null>>
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null)

  return <ToastContext.Provider value={{ message, setMessage }}>{children}</ToastContext.Provider>
}

export const useToastMessage = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useData must be used within a ToastProvider')
  }
  return context
}
