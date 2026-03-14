"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { Controller, FormProvider, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";

const Form = FormProvider;

const FormField = Controller;

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props} />
));
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn("text-sm font-medium leading-none", className)}
    {...props}
  />
));
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>((props, ref) => <Slot ref={ref} {...props} />);
FormControl.displayName = "FormControl";

const FormMessage = () => {
  const { formState } = useFormContext();
  const error = Object.values(formState.errors)[0];

  if (!error) return null;

  return (
    <p className="text-sm font-medium text-destructive">
      {String(error.message)}
    </p>
  );
};

export { Form, FormField, FormItem, FormLabel, FormControl, FormMessage };
