"use client";
import { z } from "zod";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { checkCurrentPassword } from "@/actions/auth/new-password";
import { Session } from "next-auth";
import { useState } from "react";

const formSchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: "Enter your current password.",
    }),
    newPassword: z
      .string()
      .min(8, {
        message: "New password must be at least 8 characters long.",
      })
      .regex(/[A-Z]/, {
        message: "New password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "New password must contain at least one lowercase letter.",
      })
      .regex(/[@$!%*#?&]/, {
        message:
          "New password must contain at least one special character such as @$!%*#?&.",
      }),
    confirmPassword: z.string().min(8, {
      message: "Confirm password must be at least 8 characters long.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

interface PasswordInformationProps {
  session: Session;
}

const PasswordInformation = ({ session }: PasswordInformationProps) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const isMatch = await checkCurrentPassword(
      session.user?.id!,
      values.currentPassword,
      values.newPassword
    );

    if (isMatch) {
      setSuccessMessage("Password changed successfully!");
    } else {
      form.setError("currentPassword", {
        type: "manual",
        message: "Current password is incorrect.",
      });
      setSuccessMessage(null);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input className="max-w-[500px]" type="password" {...field} />
              </FormControl>
              <FormDescription>Enter your current password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input className="max-w-[500px]" type="password" {...field} />
              </FormControl>
              <FormDescription>Enter your new password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input className="max-w-[500px]" type="password" {...field} />
              </FormControl>
              <FormDescription>Confirm your new password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {successMessage && (
          <p className="text-green-500 font-bold">{successMessage}</p>
        )}
        <Button size={"sm"} className="bg-[#BC6C25] hover:bg-[#DDA15E]">
          Change Password
        </Button>
      </form>
    </Form>
  );
};

export default PasswordInformation;
