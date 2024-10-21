"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const SliderVertical = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex flex-col h-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-full w-4 grow overflow-hidden rounded-full bg-lightShade/30">
      <SliderPrimitive.Range className="absolute h-full w-4 bg-lightShade" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-8 w-8 rounded-full hover:cursor-pointer  bg-secondary shadow transition-colors focus-visible:outline-none   disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-800 dark:border-neutral-50/50 dark:bg-neutral-950 dark:focus-visible:ring-neutral-300" />
  </SliderPrimitive.Root>
))
SliderVertical.displayName = SliderPrimitive.Root.displayName

export { SliderVertical }
