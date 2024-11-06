"use client";

import Image from "next/image";
import AuthFormWrapper from "./auth-form-wrapper";
import sideBg from "../../assets/student-with-computer-vector-23667723-removebg-preview_copy-removebg-preview 1.png";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const jacques = Jacques_Francois({
  weight: "400",
  subsets: ["latin"],
});

const formSchema = z
  .object({
    email: z.string().email({ message: "Email is required." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/\d/, { message: "Password must contain at least one number." })
      .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z.string(),
    firstName: z
      .string()
      .trim()
      .min(1, { message: "First name is required." })
      .regex(/^[a-zA-Z-'À-ÖØ-öø-ÿ\s]+$/, {
        message: "Invalid characters in name.",
      }),
    lastName: z
      .string()
      .trim()
      .min(1, { message: "Last name is required." })
      .regex(/^[a-zA-Z-'À-ÖØ-öø-ÿ\s]+$/, {
        message: "Invalid characters in name.",
      }),
    role: z.string().min(1, { message: "Role is required." }),
    schoolId: z.string({ required_error: "Please select your school." }),
    terms: z.literal(true, {
      errorMap: () => ({
        message: "You must accept the terms and conditions.",
      }),
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
          <h1 className={`text-3xl xl:text-4xl text-[#606C38]`}>Register</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
              <div className="space-y-5 mt-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email <span className=""> *</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="johndoe@gmail.com"
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
                        <FormLabel>
                          First name <span className=""> *</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="John"
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
                        <FormLabel>
                          Last name <span className=""> *</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Doe"
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
                      <FormLabel>
                        Password <span className=""> *</span>
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          {...field}
                          type="password"
                          placeholder="Password"
                          className="border-gray-400"
                        />
                      </FormControl>
                      <FormDescription>
                        Must be 8+ characters, include uppercase, lowercase,
                        number, and special character.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Confirm password <span className=""> *</span>
                      </FormLabel>
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
                      <FormLabel>
                        Role <span className=""> *</span>
                      </FormLabel>
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
                      <FormLabel>
                        School <span className=""> *</span>
                      </FormLabel>
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
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="terms"
                          name="terms"
                        />
                        <Label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Accept{" "}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="link"
                                className="p-0 h-auto font-normal"
                              >
                                terms and conditions
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Terms of Service</DialogTitle>
                                <DialogDescription>
                                  Please read our Terms of Service carefully.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="mt-4 space-y-4">
                                <h3 className="text-lg font-semibold">
                                  1. Acceptance of Terms
                                </h3>
                                <p>
                                  By accessing and using this service, you
                                  accept and agree to be bound by the terms and
                                  provision of this agreement.
                                </p>

                                <h3 className="text-lg font-semibold">
                                  2. Eligibility and Account Responsibility
                                </h3>
                                <p>
                                  This Service is available to STE-affiliated
                                  school members in the Philippines. You are
                                  responsible for maintaining the
                                  confidentiality of your account and password
                                  and for any activities conducted under your
                                  account.
                                </p>

                                <h3 className="text-lg font-semibold">
                                  3. Use of the Service
                                </h3>
                                <p>
                                  You agree to use the Service for educational
                                  and research purposes only. Any unauthorized
                                  reproduction, distribution, or commercial use
                                  of materials found on this platform is
                                  strictly prohibited. You may not interfere
                                  with or disrupt the Service or attempt to
                                  access other accounts or information without
                                  permission.
                                </p>

                                <h3 className="text-lg font-semibold">
                                  4. Content Ownership and Use Rights
                                </h3>
                                <p>
                                  Content uploaded by users, including research
                                  papers, remains the intellectual property of
                                  the author or affiliated institution. By
                                  uploading content, users grant the Service a
                                  license to display the material in accordance
                                  with the visibility settings chosen by the
                                  user (e.g., public, private with purchase).
                                </p>

                                <h3 className="text-lg font-semibold">
                                  5. Purchasing Access to Private Papers
                                </h3>
                                <p>
                                  Certain papers may be set to private by the
                                  affiliated institution and require a one-time
                                  payment to access. By purchasing access, you
                                  agree that:
                                  <ul>
                                    <li>
                                      Purchased papers are for personal academic
                                      use only.
                                    </li>
                                    <li>
                                      You will not distribute, reproduce, or
                                      otherwise share the content.
                                    </li>
                                    <li>
                                      All sales are final, and no refunds will
                                      be issued.
                                    </li>
                                  </ul>
                                </p>

                                <h3 className="text-lg font-semibold">
                                  6. Privacy Policy
                                </h3>
                                <p>
                                  Your use of the service is also governed by
                                  our Privacy Policy, which can be found [link
                                  to privacy policy].
                                </p>

                                <h3 className="text-lg font-semibold">
                                  7. Termination of Access
                                </h3>
                                <p>
                                  We reserve the right to terminate or suspend
                                  your access to the Service without notice for
                                  conduct that violates these Terms of Service
                                  or is otherwise harmful to other users, the
                                  Service, or third parties.
                                </p>

                                <h3 className="text-lg font-semibold">
                                  8. Changes to the Terms
                                </h3>
                                <p>
                                  We reserve the right to modify these Terms at
                                  any time. Your continued use of the Service
                                  following any changes constitutes acceptance
                                  of those changes. Please review the Terms
                                  regularly.
                                </p>

                                <h3 className="text-lg font-semibold">
                                  9. Limitation of Liability
                                </h3>
                                <p>
                                  The Service is provided “as is” without
                                  warranties of any kind, either express or
                                  implied. The institution does not take
                                  responsibility for the accuracy, completeness,
                                  or reliability of content available on the
                                  platform. In no event shall we be liable for
                                  any indirect or consequential damages arising
                                  from your use of the Service.
                                </p>

                                <h3 className="text-lg font-semibold">
                                  10. Governing Law
                                </h3>
                                <p>
                                  These Terms are governed by the laws of the
                                  Philippines. Any disputes arising from these
                                  Terms will be resolved under the exclusive
                                  jurisdiction of the courts in the Philippines.
                                </p>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
