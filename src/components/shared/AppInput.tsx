import * as React from "react";
import { Input } from "@/components/ui/input";
import type { InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface AppInputProps extends InputProps {
  label?: string;
  error?: string;
}

export const AppInput = React.forwardRef<HTMLInputElement, AppInputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const internalId = React.useId();
    const inputId = id || internalId;

    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <Input
          id={inputId}
          ref={ref}
          className={`${error ? "border-red-500 focus-visible:ring-red-500" : ""} ${className || ""}`}
          {...props}
        />
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  },
);
AppInput.displayName = "AppInput";
