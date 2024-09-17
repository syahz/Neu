/** @format */

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { poppins, roboto, asap, archivo, ibm_plex_mono } from '@/utils/font'
import './globals.css'
import ClientProviders from './client-provider'
import { Toaster } from '@/components/ui/toaster'
import { ToastProvider } from '@/context/toast-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chat App Ingsun',
  description: 'Simple Chat App using Socket.io ingsun',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/favicon.svg'
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/favicon.svg'
      }
    ]
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <ToastProvider>
        <body className={`${inter.className} ${poppins} ${archivo} ${roboto} ${ibm_plex_mono} ${asap} bg-[#FFFFE8]`}>
          <ClientProviders>{children}</ClientProviders>
          <Toaster />
        </body>
      </ToastProvider>
    </html>
  )
}
