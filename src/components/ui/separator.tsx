"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }


export function SeparatorWithText({
  className,
  orientation = "horizontal",
  decorative = true,
  children,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <div
      data-slot="separator-with-text"
      className={cn(
        "flex justify-between items-center",
        orientation === "horizontal" ? "w-full" : "flex-col h-full",
        className
      )}
    >
      <Separator
        decorative={decorative}
        orientation={orientation}
        className="shrink"
        {...props}
      />
      <span
        className={cn(
          "shrink-0 px-2 text-sm text-muted-foreground uppercase",
          orientation === "vertical" && "-rotate-90 rtl:rotate-90"
        )}
      >
        {children}
      </span>
      <Separator
        decorative={decorative}
        orientation={orientation}
        className="shrink"
        {...props}
      />
    </div>
  )

}