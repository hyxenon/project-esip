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
  DrawerTrigger,
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
import { AddSchoolSchema } from "@/models/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "../../SingleImageDropzone";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { addSchool } from "@/actions/schoolManagement";
import { useSchoolContext } from "@/context/SchoolContext";
import { SchoolModel } from "../../SchoolForm";

interface AddSchoolButtonProps {
  onSchoolAdded: (newSchool: SchoolModel) => void;
}

export function AddSchoolButton({ onSchoolAdded }: AddSchoolButtonProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { dispatch } = useSchoolContext();

  const handleSchoolAdded = (school: SchoolModel) => {
    dispatch({ type: "ADD_SCHOOL", payload: school });
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            className="bg-[#BC6C25] hover:bg-[#A85A1D] text-[#FEFAE0]"
          >
            Add School
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] overflow-y-scroll max-h-screen">
          <DialogHeader>
            <DialogTitle>Add School</DialogTitle>
          </DialogHeader>
          <ProfileForm onSchoolAdded={handleSchoolAdded} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="bg-[#606C38]" variant="default">
          Add School
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add School</DrawerTitle>
        </DrawerHeader>
        <ProfileForm onSchoolAdded={handleSchoolAdded} />

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
  onSchoolAdded: (school: any) => void;
}

function ProfileForm({ onSchoolAdded }: ProfileFormProps) {
  const form = useForm<z.infer<typeof AddSchoolSchema>>({
    resolver: zodResolver(AddSchoolSchema),
    defaultValues: {
      email: "",
      city: "",
      contactNumber: "",
      postalCode: "",
      province: "",
      schoolName: "",
      streetAddress: "",
      image: "",
    },
  });
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState<number>(0);
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof AddSchoolSchema>) => {
    try {
      const res = await addSchool(values);
      toast({
        variant: "success",
        title: "School Added Successfully",
        description: `${res.success}`,
      });
      await edgestore.publicFiles.confirmUpload({
        url: values.image,
      });
      form.reset();
      setFile(undefined);
      setProgress(0);

      onSchoolAdded(res.data);
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${err.message}`,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 px-4 py-4">
          <div className="grid grid-cols-2 gap-x-4">
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
                      placeholder="Munoz National High School"
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
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="mnhs@gmail.com"
                      className="border-gray-400 "
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-x-4">
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
          <div className="grid grid-cols-3 gap-x-4">
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
          <div className="grid grid-cols-2 gap-x-4">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <div>
                        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-4">
                          Logo Image
                        </p>
                        <div className="flex flex-col justify-center items-center ">
                          <SingleImageDropzone
                            width={100}
                            height={100}
                            value={file}
                            onChange={(file) => {
                              setFile(file);
                            }}
                          />
                          <Progress
                            value={progress}
                            className="w-[100%] mt-2"
                          />
                          <p className="text-sm">{progress}%</p>
                          <Button
                            className="mt-2"
                            type="button"
                            onClick={async () => {
                              if (file) {
                                const res = await edgestore.publicFiles.upload({
                                  file,
                                  options: {
                                    temporary: true,
                                  },
                                  onProgressChange: (progressData) => {
                                    setProgress(progressData);
                                  },
                                });
                                form.setValue("image", res.url);
                                toast({
                                  title: "Image Uploaded Successfully!",
                                });
                              }
                            }}
                          >
                            Upload
                          </Button>
                        </div>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-center w-full">
            <Button
              className="bg-[#BC6C25] hover:bg-[#A85A1D] text-[#FEFAE0] w-full"
              type="submit"
            >
              Add School
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
