import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const knobVariants = cva("bg-red", {
    variants: {
        variant: {
            default: "bg-red-500",
            disabled: "bg-red-200",
            outline: "bg-red-500 border border-red-500",
            secondary: "bg-red-500",
        }
    },
    defaultVariants: {
        variant: "default"
    }
})

type KnobProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'disabled' | 'outline' | 'secondary';
}

const Knob = ({className, variant, ...props} : KnobProps) => {
    return (
        <div {...props} className={cn(knobVariants({variant}), className)}>
            Knob
        </div>
    );
}
export {Knob}