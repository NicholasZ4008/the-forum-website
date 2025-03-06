import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Refined button variants with more specific transition properties
const simpleButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-white text-black hover:bg-gray-200",
        primary: "border border-blue-300 bg-blue-100 text-blue-700 hover:bg-blue-200",
        secondary: "border border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200",
        danger: "border border-red-300 bg-red-100 text-red-700 hover:bg-red-200",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gray:"border border-neutral-300 bg-neutral-100 text-neutral-500"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 py-1 text-xs",
        md: "h-10 rounded-md px-4 py-2 text-sm",
        lg: "h-11 rounded-md px-6 py-3 text-base",
        icon: "h-10 w-10",
      },
      animation: {
        none: "",
        smooth: "transform transition duration-200 ease-out hover:-translate-y-1 hover:shadow-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "smooth", // Default to smooth animation
    },
  }
)

export interface SimpleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof simpleButtonVariants> {
  asChild?: boolean
}

const SimpleButton = React.forwardRef<HTMLButtonElement, SimpleButtonProps>(
  ({ className, variant, size, animation, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp 
        className={cn(simpleButtonVariants({ variant, size, animation, className }))} 
        ref={ref} 
        {...props} 
      />
    )
  }
)
SimpleButton.displayName = "SimpleButton"

export { SimpleButton, simpleButtonVariants }