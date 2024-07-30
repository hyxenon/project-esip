import { EyeOffIcon, EyeIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormDescription,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createElement, useState } from "react";
import { Box } from "./box";

type PasswordFieldProps = {
  name?: string;
  placeholder?: string;
  description?: string | JSX.Element;
  title?: string;
};

export function PasswordField({
  name = "password",
  placeholder = "Enter password",
  title = "",
}: PasswordFieldProps) {
  const { control, getFieldState } = useFormContext();
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <Box className="relative">
              <Input
                {...field}
                type={passwordVisibility ? "text" : "password"}
                autoComplete="on"
                placeholder={placeholder}
                className={`pr-12 border-gray-400 ${
                  getFieldState(name).error && "text-destructive"
                }`}
              />
              <Box
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
                onClick={() => setPasswordVisibility(!passwordVisibility)}
              >
                {createElement(passwordVisibility ? EyeOffIcon : EyeIcon, {
                  className: "h-6 w-6",
                })}
              </Box>
            </Box>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
