// --- Section: Button ---
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-white hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
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
    const Comp = asChild ? Slot : "button";

    // If asChild is used, clone the single child and merge classNames
    if (asChild) {
      try {
        const onlyChild = React.Children.only(props.children) as React.ReactElement;
        const childProps = onlyChild.props as { className?: string };
        const mergedClassName = cn(buttonVariants({ variant, size, className }), childProps?.className);
        return React.cloneElement(onlyChild, { className: mergedClassName, ref, ...props } as any);
      } catch (e) {
        // If multiple children were provided accidentally, fall back to standard button rendering below
        // (avoid throwing so the UI doesn't crash)
        // eslint-disable-next-line no-console
        console.warn('Button asChild expects a single child. Falling back to default button render.');
      }
    }

    // Non-asChild rendering: keep shimmer micro-interaction
    return (
      <Comp
        className={cn(
          "relative overflow-hidden group",
          buttonVariants({ variant, size, className }),
        )}
        ref={ref}
        {...props}
      >
        {/* Shimmer bar */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-[-40%] top-0 h-full w-40 bg-gradient-to-r from-white/0 via-white/30 to-white/0 opacity-0 transform -skew-x-12 transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-[220%]"
        />
        <span className="relative z-10 inline-flex items-center gap-2">{props.children}</span>
      </Comp>
    );
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
