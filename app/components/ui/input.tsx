import * as React from "react";
import { cn } from "@/app/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-12 w-full rounded-lg border border-white/15 bg-white/[0.06] px-4 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-teal-200/70",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
