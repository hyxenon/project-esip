"use client";
import AuthFormWrapper from "./auth-form-wrapper";
import Image from "next/image";
import sideBg from "../../assets/student-with-computer-vector-23667723-removebg-preview_copy-removebg-preview 1.png";
import { Jacques_Francois } from "next/font/google";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const jacques = Jacques_Francois({
  weight: "400",
  subsets: ["latin"],
});

const formSchema = z.object({
  schoolName: z.string().min(1, {
    message: "Enter your school name",
  }),
  streetAddress: z.string().min(1, {
    message: "Enter your street address",
  }),
  city: z.string().min(1, {
    message: "Enter your school city",
  }),
  province: z.string().min(1, {
    message: "Enter your school province",
  }),
  postalCode: z.string().regex(/^\d{4}$/, {
    message: "Enter a valid 4-digit postal code",
  }),
  contactNumber: z
    .string()
    .regex(/^09\d{9}$/, {
      message: "Enter a valid phone number starting with 09",
    })
    .min(11, { message: "Phone number must be 11 digits long" })
    .max(11, { message: "Phone number must be 11 digits long" }),
  email: z.string().email({ message: "School email is required." }),
});

const SchoolRegister = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schoolName: "",
      streetAddress: "",
      city: "",
      province: "",
      postalCode: "",
      contactNumber: "",
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <AuthFormWrapper>
      <div className="lg:w-[650px] xl:w-[800px] flex flex-col lg:flex-row z-10">
        <div className="flex flex-col bg-white items-center px-8 py-12 border border-gray-300 shadow-2xl">
          <h1
            className={`text-3xl xl:text-4xl text-[#606C38] ${jacques.className}`}
          >
            School Register
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
              <div className="space-y-5 mt-4">
                <FormField
                  control={form.control}
                  name="schoolName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Jose Rizal High School"
                          className="border-gray-400"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="joserizal@gmail.com"
                          className="border-gray-400"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex gap-x-4">
                  <FormField
                    control={form.control}
                    name="streetAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="147 T. Delos Santos"
                            className="border-gray-400"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Cabanatuan"
                            className="border-gray-400"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-x-4">
                  <FormField
                    control={form.control}
                    name="province"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Province</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Nueva Ecija"
                            className="border-gray-400"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip/Postal Code</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="3100"
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
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="0915xxxxxxx"
                          className="border-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                className="w-full mt-4 bg-[#606C38] hover:bg-[#283618]"
                type="submit"
              >
                Create an account
              </Button>
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

export default SchoolRegister;
