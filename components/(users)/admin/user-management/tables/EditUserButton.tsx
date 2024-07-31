"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { RegisterSchema, UserEditSchema } from "@/models/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";

import { useToast } from "@/components/ui/use-toast";

import Image from "next/image";

import { useSchoolContext } from "@/context/SchoolContext";
import { CheckIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getOneUserData, updateUser } from "@/actions/userManagement";
import {
  UserModel,
  useUserManagementContext,
} from "@/context/UserManagementContext";
import { User } from "./teacherTable/column";

interface EditUserButtonProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

export function EditUserButton({ isOpen, setIsOpen, id }: EditUserButtonProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] overflow-y-scroll max-h-screen">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <ProfileForm id={id} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit User</DrawerTitle>
        </DrawerHeader>
        <ProfileForm id={id} />

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
  id: string;
}

type UserEditModel = {
  name: string | null;
  email: string | null;
  role: string | null;
  schoolId: string | null;
  image: string | null;
};

function ProfileForm({ id }: ProfileFormProps) {
  const { state: schoolState } = useSchoolContext();
  const { state: userState, dispatch } = useUserManagementContext();

  const { schools } = schoolState;
  const { users } = userState;

  const [userData, setUserData] = useState<UserEditModel>();
  const [formInitialized, setFormInitialized] = useState(false);

  const form = useForm<z.infer<typeof UserEditSchema>>({
    resolver: zodResolver(UserEditSchema),
    defaultValues: {},
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getOneUserData(id);
      if (user) {
        setUserData(user);
        form.setValue("name", user.name ? user.name : "");
        form.setValue("email", user.email ? user.email : "");
        form.setValue("role", user.role ? user.role : "");
        form.setValue("schoolId", user.schoolId ? user.schoolId : "");
        form.setValue("image", user.image ? user.image : "");
      }
    };

    fetchUserData();
  }, [id, form]);

  useEffect(() => {
    if (userData) {
      setFormInitialized(true);
    }
  }, [userData]);

  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState<number>(0);
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof UserEditSchema>) => {
    const user = await updateUser(id, values);
    if (user) {
      toast({
        variant: "success",
        title: "User Updated Successfully",
        description: `Updated changes to ${userData?.name}`,
      });
      const updatedUser: User = {
        id: user.id,
        email: values.email,
        image: values.image,
        createdAt: new Date(user!.createdAt),
        updatedAt: new Date(),
        name: values.name,
        role: values.role,
        school: user.school,
        schoolId: values.schoolId,
      };
      dispatch({ type: "EDIT_USER", payload: updatedUser });
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `Error updating user`,
      });
    }
  };

  if (!formInitialized) {
    return <p>Loading...</p>; // Placeholder until schoolData is fetched
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 px-4 py-4">
          <div className="flex justify-center items-center flex-col">
            <Image
              src={
                userData?.image
                  ? userData.image
                  : "https://github.com/shadcn.png"
              }
              alt="profile pic"
              width={70}
              height={70}
              className="rounded-full"
            />
            <Button type="button" size={"sm"} className="mt-2 mb-4">
              Change Profile Picture
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="John Doe"
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
                      placeholder="johndoe@gmail.com"
                      className="border-gray-400"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-x-4">
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
                      value={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="TEACHER" />
                        </FormControl>
                        <FormLabel className="font-normal">Teacher</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="STUDENT" />
                        </FormControl>
                        <FormLabel className="font-normal">Student</FormLabel>
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
                  <Popover modal={true}>
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
                                      (school) => school.id === field.value
                                    )?.image ||
                                    "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721383200&semt=sph"
                                  }
                                  alt="logo"
                                  width={20}
                                  height={10}
                                />{" "}
                                {
                                  schools?.find(
                                    (school) => school.id === field.value
                                  )?.schoolName
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
                    <PopoverContent side="left" className=" p-0">
                      <Command>
                        <CommandList>
                          <CommandEmpty>No schools found.</CommandEmpty>
                          <CommandGroup>
                            {schools?.map((school) => (
                              <CommandItem
                                value={school.schoolName}
                                key={school.id}
                                onSelect={() => {
                                  form.setValue("schoolId", school.id);
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
                                  {school.schoolName}
                                </div>

                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    school.id === field.value
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

          <div className="flex items-center justify-center w-full ">
            <Button
              className="bg-[#606C38] hover:bg-[#283618] w-full mt-8"
              type="submit"
            >
              Edit User
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default EditUserButton;
