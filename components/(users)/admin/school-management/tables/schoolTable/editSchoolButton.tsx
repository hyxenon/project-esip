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
import { AddSchoolSchema } from "@/models/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "../../SingleImageDropzone";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { editSchool, getSchool } from "@/actions/schoolManagement";
import Image from "next/image";
import { SchoolModel } from "../../SchoolForm";
import { useSchoolContext } from "@/context/SchoolContext";

interface EditSchoolButtonProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  schoolId: string;
}

export function EditSchoolButton({
  isOpen,
  setIsOpen,
  schoolId,
}: EditSchoolButtonProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] overflow-y-scroll max-h-screen">
          <DialogHeader>
            <DialogTitle>Edit School</DialogTitle>
          </DialogHeader>
          <ProfileForm schoolId={schoolId} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit School</DrawerTitle>
        </DrawerHeader>
        <ProfileForm schoolId={schoolId} />

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
  schoolId: string;
}

function ProfileForm({ schoolId }: ProfileFormProps) {
  const { dispatch } = useSchoolContext();
  const [schoolData, setSchoolData] = useState<SchoolModel>();
  const [formInitialized, setFormInitialized] = useState(false);

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

  useEffect(() => {
    const fetchSchoolData = async () => {
      const res = await getSchool(schoolId);
      if (res && res.message) {
        setSchoolData(res.message);
        // Manually set form values once schoolData is fetched
        form.setValue("schoolName", res.message.schoolName);
        form.setValue("email", res.message.email);
        form.setValue("streetAddress", res.message.streetAddress);
        form.setValue("city", res.message.city);
        form.setValue("province", res.message.province);
        form.setValue("postalCode", res.message.postalCode);
        form.setValue("contactNumber", res.message.contactNumber);
        form.setValue("image", res.message.image ? res.message.image : "");
      }
    };

    fetchSchoolData();
  }, [schoolId, form]);

  useEffect(() => {
    if (schoolData) {
      setFormInitialized(true);
    }
  }, [schoolData]);

  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState<number>(0);
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof AddSchoolSchema>) => {
    try {
      const res = await editSchool(schoolId, values);
      toast({
        variant: "success",
        title: "School Updated Successfully",
        description: `Updated changes to ${res.message}`,
      });

      const updatedSchool: SchoolModel = {
        id: schoolId,
        email: values.email,
        schoolName: values.schoolName,
        streetAddress: values.streetAddress,
        city: values.city,
        province: values.province,
        postalCode: values.postalCode,
        image: values.image,
        contactNumber: values.contactNumber,
        createdAt: new Date(schoolData!.createdAt),
        updatedAt: new Date(),
        status: schoolData!.status,
      };

      dispatch({ type: "EDIT_SCHOOL", payload: updatedSchool });

      setFile(undefined);
      setProgress(0);
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${err.message}`,
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
                        {/* <div className="flex flex-col justify-center items-center ">
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
                        </div> */}
                        <Image
                          src={
                            schoolData?.image
                              ? schoolData.image
                              : "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721383200&semt=sph"
                          }
                          alt="logo"
                          width={100}
                          height={100}
                        />
                        <Button type="button">Change Logo</Button>
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
              className="bg-[#606C38] hover:bg-[#283618] w-full"
              type="submit"
            >
              Edit School
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
