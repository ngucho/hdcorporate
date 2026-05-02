import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../lib/utils'

const textareaVariants = cva(
  'flex min-h-[80px] w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition-[border-color,box-shadow,background] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input bg-background/80',
        glass: 'border-border/50 bg-card/35 backdrop-blur-md backdrop-saturate-125',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface TextareaProps
  extends React.ComponentProps<'textarea'>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return <textarea className={cn(textareaVariants({ variant }), className)} ref={ref} {...props} />
  }
)
Textarea.displayName = 'Textarea'

export { Textarea, textareaVariants }
