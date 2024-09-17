/** @format */

import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'destructive'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, variant = 'default', ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-8 w-full rounded-md border bg-[#FFFFE8] px-3 py-1 font-poppins text-sm font-medium text-black shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground hover:bg-[#00FF72]/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'destructive' ? 'border-2 border-red-500 bg-[#f3d8d8] focus-visible:ring-red-500' : 'border-black focus-visible:ring-ring', // Changed here
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
