/** @format */

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  ' inline-flex items-center font-asap justify-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'text-base  font-bold border-black bg-[#FFFFF] text-black hover:bg-[#FFFFF]/50 border border-2 shadow-[5px_5px_0px_rgba(0,0,0,1)] active:shadow-[3px_3px_0px_rgba(0,0,0,1)]',
        destructive:
          'text-base font-semibold border-black bg-destructive text-white hover:bg-destructive/80 border border-2 shadow-[5px_5px_0px_rgba(0,0,0,1)] active:shadow-[3px_3px_0px_rgba(0,0,0,1)]',
        outline: 'text-base font-semibold border-black text-white border border-2 shadow-[5px_5px_0px_rgba(0,0,0,1)] active:shadow-[3px_3px_0px_rgba(0,0,0,1)]',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        success:
          'text-base font-bold border-black bg-[#00FF72] text-black hover:bg-[#00FF72]/50 border border-2 shadow-[5px_5px_0px_rgba(0,0,0,1)] active:shadow-[3px_3px_0px_rgba(0,0,0,1)]',
        warning:
          'text-base font-bold border-black bg-[#EBFF00] text-black hover:bg-[#EBFF00]/50 border border-2 shadow-[5px_5px_0px_rgba(0,0,0,1)] active:shadow-[3px_3px_0px_rgba(0,0,0,1)]',
        link: 'text-primary underline-offset-4 hover:underline',
        icons:
          'text-base font-bold border-black bg-[#00FF72] text-black hover:bg-[#00FF72]/50 border border-2 shadow-[3px_3px_0px_rgba(0,0,0,1)] active:shadow-[3px_3px_0px_rgba(0,0,0,1)]'
      },
      size: {
        default: 'h-11 py-4 px-8',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-8 w-8'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
})
Button.displayName = 'Button'

export { Button, buttonVariants }
