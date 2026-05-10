import * as React from "react";
import { cn } from "@/app/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "glass rounded-lg border border-white/10 p-5",
        className,
      )}
      {...props}
    />
  );
}
