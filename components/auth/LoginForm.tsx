"use client";
import React, { useState, useTransition } from "react";
import Image from "next/image";
import searchBg from "../../assets/authForm/searchBg.svg";
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
import { Jacques_Francois } from "next/font/google";

const jacques = Jacques_Francois({
  weight: "400",
  subsets: ["latin"],
});

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
      <div className=" h-[450px] w-[800px] flex gap-0.5 bg-white z-50">
        <div className="bg-[#283618] flex items-center justify-center px-12 border border-gray-300 shadow-2xl">
          <Image draggable="false" src={searchBg} alt="" />
        </div>
        <div className="flex-1 flex items-center py-4 flex-col border border-gray-300 shadow-2xl">
          <h1 className={`text-4xl mt-4 text-[#606C38] ${jacques.className}`}>
            Welcome Back
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full px-8 z-10 mt-8"
            >
              <div className="space-y-5">
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
                          className="border-gray-400"
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
                          className="border-gray-400"
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
                  className="px-0 font-normal text-[#BC6C25]"
                >
                  <Link href={"/reset-password"}>Forgot password?</Link>
                </Button>
              </div>
              <FormError message={error || urlError} />
              <FormSuccess message={success} />
              <Button
                disabled={isPending}
                className="w-full mt-4 bg-[#606C38] hover:bg-[#283618]"
                type="submit"
              >
                Login
              </Button>
              <p className="text-sm mt-4 text-center">
                Don't have an account? Click here to {""}
                <Link href={"/register"} className="text-[#BC6C25]">
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
