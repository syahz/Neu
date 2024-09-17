// types/next-auth.d.ts
import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    fullName: string
    username: string
  }

  interface Session {
    user: {
      id: string
      fullName: string
      username: string
    } & DefaultSession['user']
  }

  interface JWT {
    id: string
    fullName: string
    username: string
  }
}
