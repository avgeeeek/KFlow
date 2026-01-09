"use client"

import * as React from "react"
import { cn } from "./button"

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    valueDisplay?: string | number;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
    ({ className, label, valueDisplay, ...props }, ref) => {
        return (
            <div className="space-y-3">
                {(label || valueDisplay) && (
                    <div className="flex justify-between items-center text-sm">
                        {label && <label className="font-medium text-slate-700">{label}</label>}
                        {valueDisplay && <span className="text-slate-500 font-mono">{valueDisplay}</span>}
                    </div>
                )}
                <input
                    type="range"
                    className={cn(
                        "w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        )
    }
)
Slider.displayName = "Slider"

export { Slider }
