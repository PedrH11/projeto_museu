"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils" // Utilitário padrão do shadcn

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end" | "baseline" | "stretch"
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly"
  direction?: "row" | "row-reverse" | "col" | "col-reverse"
  wrap?: "wrap" | "nowrap" | "wrap-reverse"
  gap?: number | string
  inline?: boolean
  asChild?: boolean
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ className, align, justify, direction, wrap, gap, inline, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"

    // Mapeamento de props para classes do Tailwind
    const alignClasses = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      baseline: "items-baseline",
      stretch: "items-stretch",
    }

    const justifyClasses = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    }

    const directionClasses = {
      row: "flex-row",
      "row-reverse": "flex-row-reverse",
      col: "flex-col",
      "col-reverse": "flex-col-reverse",
    }

    const wrapClasses = {
      wrap: "flex-wrap",
      nowrap: "flex-nowrap",
      "wrap-reverse": "flex-wrap-reverse",
    }

    return (
      <Comp
        ref={ref}
        className={cn(
          inline ? "inline-flex" : "flex",
          direction && directionClasses[direction],
          align && alignClasses[align],
          justify && justifyClasses[justify],
          wrap && wrapClasses[wrap],
          className
        )}
        style={{ gap: gap ? (typeof gap === 'number' ? `${gap * 0.25}rem` : gap) : undefined }}
        {...props}
      />
    )
  }
)

Flex.displayName = "Flex"

export { Flex }