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
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "@/actions/auth/register";
import { Input } from "../ui/input";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "../ui/button";
import Link from "next/link";
import { Jacques_Francois } from "next/font/google";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

import { getSchools } from "@/actions/schoolManagement";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { PasswordInput } from "../ui/password-input";

const jacques = Jacques_Francois({
  weight: "400",
  subsets: ["latin"],
});

const formSchema = z
  .object({
    email: z.string().email({ message: "Email is required." }),
    password: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
    confirmPassword: z.string(),
    firstName: z.string().trim().min(1, { message: "First name is required." }),
    lastName: z.string().trim().min(1, { message: "Last name is required." }),
    role: z.string().min(1, { message: "Role is required." }),
    schoolId: z.string({
      required_error: "Please select your school.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

interface SchoolModel {
  label: string;
  value: string;
  image: string | null;
}
const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [schools, setSchools] = useState<SchoolModel[]>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      role: "",
    },
  });

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const res = await getSchools();
        const formattedSchools = res.message.map((school) => ({
          label: school.schoolName,
          value: school.id,
          image: school.image,
        }));
        setSchools(formattedSchools);
      } catch (error) {
        console.error("Error fetching schools:", error);
        // Handle error state if needed
      }
    };

    fetchSchool();
  }, []);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        form.reset();
      });
    });
  };
  return (
    <AuthFormWrapper>
      {/* Register Form */}
      <div className="lg:w-[650px] xl:w-[800px] flex flex-col lg:flex-row mt-8 2xl:mt-0 z-10">
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="johndoe@gmail.com"
                          className="border-gray-400"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex gap-x-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="John"
                            className="border-gray-400"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Doe"
                            className="border-gray-400"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput
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
                      <FormLabel>Confirm password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          {...field}
                          type="password"
                          placeholder="Confirm password"
                          className="border-gray-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="TEACHER" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Teacher
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="STUDENT" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Student
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="schoolId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>School</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                " justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                <>
                                  <div className="flex gap-1">
                                    <Image
                                      src={
                                        schools?.find(
                                          (school) =>
                                            school.value === field.value
                                        )?.image ||
                                        "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721383200&semt=sph"
                                      }
                                      alt="logo"
                                      width={20}
                                      height={10}
                                    />{" "}
                                    {
                                      schools?.find(
                                        (school) => school.value === field.value
                                      )?.label
                                    }
                                  </div>
                                </>
                              ) : (
                                <>Select School</>
                              )}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className=" p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search School..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No schools found.</CommandEmpty>
                              <CommandGroup>
                                {schools?.map((school) => (
                                  <CommandItem
                                    value={school.label}
                                    key={school.value}
                                    onSelect={() => {
                                      form.setValue("schoolId", school.value);
                                    }}
                                  >
                                    <div className="flex gap-4">
                                      <Image
                                        alt="logo"
                                        src={
                                          school.image === null
                                            ? "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721383200&semt=sph"
                                            : school.image
                                        }
                                        width={20}
                                        height={10}
                                      />
                                      {school.label}
                                    </div>

                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        school.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
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
