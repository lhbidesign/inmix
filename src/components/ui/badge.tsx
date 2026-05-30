import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-normal transition-colors tracking-[0.03em]",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[--color-primary] text-[--color-primary-foreground]",
        secondary: "border-transparent bg-[--color-secondary] text-[--color-secondary-foreground]",
        destructive: "border-transparent bg-[--color-destructive] text-[--color-destructive-foreground]",
        outline: "text-[--color-foreground]",
        success: "border-transparent bg-emerald-500/20 text-emerald-400",
        warning: "border-transparent bg-amber-500/20 text-amber-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
