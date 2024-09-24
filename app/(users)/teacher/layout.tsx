import type { Metadata } from "next";

import Navbar from "@/components/(users)/navbar";

import { SchoolProvider } from "@/context/SchoolContext";

export const metadata: Metadata = {
  title: "Teacher",
  description: "Teacher View",
};

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await auth();

  // if (session?.user?.role !== "TEACHER") {
  //   return <Unauthorized />;
  // }
  return (
    <SchoolProvider>
      <Navbar role="TEACHER" />
      <div className="flex flex-col lg:min-h-[calc(100vh-73px)] ">
        <div className="flex-1 bg-white">{children}</div>
      </div>
    </SchoolProvider>
  );
}
