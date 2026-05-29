import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors",
          "placeholder:text-[--color-muted-foreground]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ring]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        style={{
          background: 'var(--color-input)',
          borderColor: 'var(--color-border)',
          color: 'var(--color-foreground)',
        }}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
