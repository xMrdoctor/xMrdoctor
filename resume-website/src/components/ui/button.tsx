import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils"; // cn will be created later

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-light-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-dark-background dark:focus-visible:ring-dark-ring",
  {
    variants: {
      variant: {
        default: "bg-light-primary text-light-primary-foreground hover:bg-light-primary/90 dark:bg-dark-primary dark:text-dark-primary-foreground dark:hover:bg-dark-primary/90",
        destructive:
          "bg-light-destructive text-light-destructive-foreground hover:bg-light-destructive/90 dark:bg-dark-destructive dark:text-dark-destructive-foreground dark:hover:bg-dark-destructive/90",
        outline:
          "border border-light-input bg-light-background hover:bg-light-accent hover:text-light-accent-foreground dark:border-dark-input dark:bg-dark-background dark:hover:bg-dark-accent dark:hover:text-dark-accent-foreground",
        secondary:
          "bg-light-secondary text-light-secondary-foreground hover:bg-light-secondary/80 dark:bg-dark-secondary dark:text-dark-secondary-foreground dark:hover:bg-dark-secondary/80",
        ghost: "hover:bg-light-accent hover:text-light-accent-foreground dark:hover:bg-dark-accent dark:hover:text-dark-accent-foreground",
        link: "text-light-primary underline-offset-4 hover:underline dark:text-dark-primary",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
