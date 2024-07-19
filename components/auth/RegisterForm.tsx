"use client";

import Image from "next/image";
import AuthFormWrapper from "./auth-form-wrapper";
import sideBg from "../../assets/student-with-computer-vector-23667723-removebg-preview_copy-removebg-preview 1.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "@/actions/auth/register";
import { Input } from "../ui/input";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "../ui/button";
import Link from "next/link";
import { Jacques_Francois } from "next/font/google";

const jacques = Jacques_Francois({
  weight: "400",
  subsets: ["latin"],
});

const formSchema = z
  .object({
    email: z.string().email({ message: "Email is required." }),
    password: z.string().min(1, { message: "Password is required." }),
    confirmPassword: z.string(),
    firstName: z.string().min(1, { message: "First name is required." }),
    lastName: z.string().min(1, { message: "Last name is required." }),
    accessKey: z.string().min(1, { message: "Access Key is required." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      accessKey: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };
  return (
    <AuthFormWrapper>
      {/* Register Form */}
      <div className="lg:w-[650px] xl:w-[800px] flex flex-col lg:flex-row z-10 mt-16">
        <div className="flex flex-col bg-white items-center px-8 py-12 border border-gray-300 shadow-2xl">
          <h1
            className={`text-3xl xl:text-4xl text-[#606C38] ${jacques.className}`}
          >
            Register
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
              <div className="space-y-5 mt-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Email"
                          className="border-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-x-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="First Name"
                            className="border-gray-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Last Name"
                            className="border-gray-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Confirm Password"
                          className="border-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accessKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Access Key"
                          className="border-gray-400"
                        />
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
                className="w-full mt-4 bg-[#606C38] hover:bg-[#283618]"
                type="submit"
              >
                Create an account
              </Button>
              <p className="text-sm text-center">
                Already have an account? {""}
                <Link href={"/login"} className="font-semibold text-[#BC6C25]">
                  Login
                </Link>{" "}
                here
              </p>
            </form>
          </Form>
        </div>
        <div className="bg-[#667240] hidden lg:flex items-center justify-center border border-gray-300 shadow-2xl">
          <Image draggable="false" alt="" src={sideBg} className="" />
        </div>
      </div>
    </AuthFormWrapper>
  );
};

export default RegisterForm;
