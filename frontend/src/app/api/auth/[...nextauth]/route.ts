import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
	
          const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password
            })
          })

          const user = await res.json()

          // Jika respons tidak OK, lemparkan error dari backend
          if (!res.ok) {
            throw new Error(user.errors || 'Login failed')
          }

          if (user?.data) {
            return {
              id: user.data.userId,
              fullName: user.data.fullName,
              username: user.data.username
            }
          }

          return null
        } catch (error: any) {
          console.error('Login error:', error)
          // Kirimkan pesan error yang lebih jelas
          throw new Error(error.message || 'Something went wrong')
        }
      }
    })
  ],
  pages: {
    signIn: '/', // Custom sign-in page
    error: '/' // Custom error page
  },
  session: {
    strategy: 'jwt',
    maxAge: 3 * 60 * 60
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.fullName = user.fullName
        token.username = user.username
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.fullName = token.fullName as string
        session.user.username = token.username as string
      }
      return session
    }
  },
  debug: true // Enable debug logs
})

export { handler as GET, handler as POST }
