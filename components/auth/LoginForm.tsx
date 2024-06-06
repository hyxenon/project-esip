"use client";
import React, { useState, useTransition } from "react";
import Image from "next/image";
import searchBg from "../../assets/search-removebg-preview 1.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/models/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { login } from "@/actions/login";
import { Input } from "../ui/input";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "../ui/button";
import Link from "next/link";
import AuthFormWrapper from "./auth-form-wrapper";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <AuthFormWrapper>
      {/* Login Form */}
      <div className="h-[500px] bg-gray-400 w-[800px] flex">
        <div className="bg-black bg-opacity-55">
          <Image className="-z-50" draggable="false" src={searchBg} alt="" />
        </div>
        <div className="flex-1 flex items-center py-4 z-1 flex-col bg-[#D9D9D9]">
          <h1 className="text-3xl mt-4 text-[#4DAB67]">Welcome Back</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full px-8 z-10"
            >
              <div className="space-y-5 mt-16">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Email Address"
                          className="bg-[#948B8B] text-white border-none outline-none placeholder:text-white"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Password"
                          className="bg-[#948B8B] text-white border-none outline-none placeholder:text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  size={"sm"}
                  variant={"link"}
                  asChild
                  className="px-0 font-normal"
                >
                  <Link href={"/reset-password"}>Forgot password?</Link>
                </Button>
              </div>
              <FormError message={error || urlError} />
              <FormSuccess message={success} />
              <Button
                disabled={isPending}
                className="w-full mt-4 bg-[#948B8B]"
                type="submit"
              >
                Login
              </Button>
              <p className="text-sm mt-4 text-center">
                Don't have an account? Click here to {""}
                <Link href={"/register"} className="font-bold">
                  register
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </AuthFormWrapper>
  );
};

export default LoginForm;
