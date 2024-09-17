'use client'
import { createContext, useContext, ReactNode } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

// Definisikan tipe User sesuai dengan properti yang ada di session.user
type User = {
  id: string
  fullName: string
  username: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession()

  const user = session?.user as User | null // Menggunakan tipe User
  const isAuthenticated = !!session
  const loading = status === 'loading'

  const login = () => signIn()
  const logout = () => signOut()

  return <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
