import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
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

export function AddSchoolButton() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-[#606C38] hover:bg-[#283618]" variant="default">
            Add School
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add School</DialogTitle>
            <DialogDescription>
              Manually Add School that can access the website.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
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
          <DrawerDescription>
            Manually Add School that can access the website.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm() {
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

  const onSubmit = (values: z.infer<typeof AddSchoolSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 px-4 py-4">
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
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo Image</FormLabel>
                <FormControl>
                  <Input {...field} type="file" className="border-gray-400" />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex items-center justify-center w-full">
            <Button
              className="bg-[#606C38] hover:bg-[#283618] w-full"
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
