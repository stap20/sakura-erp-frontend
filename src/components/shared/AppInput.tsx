import * as React from "react";
import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface AppInputProps extends InputProps {
  label?: string;
  error?: string;
}

export const AppInput = React.forwardRef<HTMLInputElement, AppInputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || Math.random().toString(36).substring(7);

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
