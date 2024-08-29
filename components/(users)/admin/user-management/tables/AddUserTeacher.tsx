"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useTransition } from "react";

import { useToast } from "@/components/ui/use-toast";

import Image from "next/image";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/actions/auth/register";

import { User } from "./teacherTable/column";
import { PasswordField } from "@/components/ui/password-field";

interface SchoolModel {
  label: string;
  value: string;
  image: string | null;
  id: string;
}

interface AddUserTeacherProps {
  selectedSchool: any;
}

export function AddUserTeacher({ selectedSchool }: AddUserTeacherProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="bg-[#BC6C25] hover:bg-[#A85A1D] text-[#FEFAE0]"
            variant="default"
          >
            Add Teacher
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] overflow-y-scroll max-h-screen">
          <DialogHeader>
            <DialogTitle>Add Teacher</DialogTitle>
          </DialogHeader>
          <ProfileForm selectedSchool={selectedSchool} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#606C38] hover:bg-[#283618]" variant="default">
          Add Teacher
        </Button>
      </DialogTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Teacher</DrawerTitle>
        </DrawerHeader>
        <ProfileForm selectedSchool={selectedSchool} />

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

interface ProfileFormProps {
  selectedSchool: any;
}

function ProfileForm({ selectedSchool }: ProfileFormProps) {
  const formSchema = z
    .object({
      email: z.string().email({ message: "Email is required." }),
      password: z.string().min(6, {
        message: "Minimum 6 characters required",
      }),
      confirmPassword: z.string(),
      firstName: z.string().min(1, { message: "First name is required." }),
      lastName: z.string().min(1, { message: "Last name is required." }),
      role: z.string().min(1, { message: "Role is required." }),
      schoolId: z.string({
        required_error: "Please select your school.",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

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
    form.setValue("role", "TEACHER");
    form.setValue("schoolId", selectedSchool?.id ? selectedSchool.id : "");
  }, [selectedSchool, form]);

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const randomPasswordGenerator = (length: number = 12): string => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    return password;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values, true).then((data) => {
        if (data.success) {
          const newUser: User = {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email || "",
            role: data.user.role,
            image: data.user.image || undefined,
            createdAt: new Date(data.user.createdAt),
            updatedAt: new Date(data.user.updatedAt),
            schoolId: data.user.schoolId,
            school: data.user.school || null, // Adjust if `school` can be missing
          };

          setSuccess(data.success);
          form.reset();
        } else {
          setError(data.error);
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
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

          <div className="grid grid-cols-2 gap-x-4">
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

          <div className="grid grid-cols-2 gap-x-4">
            <PasswordField name="password" title="Password" />
            <PasswordField name="confirmPassword" title="Confirm Password" />

            <Button
              className="w-[9rem] mt-4"
              type="button"
              onClick={() => {
                const ranPass = randomPasswordGenerator();
                form.setValue("password", ranPass);
                form.setValue("confirmPassword", ranPass);
              }}
            >
              Generate Password
            </Button>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-4">
              <FormLabel>Role</FormLabel>
              <p>Teacher</p>
            </div>
            <div className="flex flex-col gap-4">
              <FormLabel>School</FormLabel>
              <div className="flex gap-2">
                <Image
                  src={
                    selectedSchool
                      ? selectedSchool.image ||
                        "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721383200&semt=sph"
                      : "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721383200&semt=sph"
                  }
                  alt="logo"
                  width={30}
                  height={30}
                  className="w-7 h-7 rounded-full"
                />
                <p>{selectedSchool.schoolName}</p>
              </div>
            </div>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <div className="flex items-center justify-center w-full ">
            <Button
              disabled={isPending}
              className="bg-[#BC6C25] hover:bg-[#A85A1D] text-[#FEFAE0] mt-8 w-full"
              type="submit"
            >
              Add Teacher
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default AddUserTeacher;
