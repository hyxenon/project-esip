"use client";

import { z } from "zod";

import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ResetSchema } from "@/models/models";
import { FormSuccess } from "../form-success";
import { reset } from "@/actions/auth/reset";
import { FormError } from "../form-error";
import AuthFormWrapper from "./auth-form-wrapper";
import Link from "next/link";

const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };
  return (
    <AuthFormWrapper>
      <div className="flex flex-col border border-gray-200 w-[400px] px-16 py-8 shadow-2xl mt-24 bg-white">
        <h1 className="font-bold mb-8 text-[#606C38]">Forgot your password?</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              disabled={isPending}
              className="w-full bg-[#BC6C25] hover:bg-[#DDA15E] transition-all text-[#FEFAE0]"
              type="submit"
            >
              Send reset email
            </Button>
          </form>
        </Form>
        <Button variant="link" className="mt-4">
          <Link href={"/login"}>Back to login</Link>
        </Button>
      </div>
    </AuthFormWrapper>
  );
};

export default ResetForm;
