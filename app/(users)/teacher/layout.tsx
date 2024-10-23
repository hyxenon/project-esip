import type { Metadata } from "next";

import Navbar from "@/components/(users)/navbar";

import { SchoolProvider } from "@/context/SchoolContext";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getSchool } from "@/actions/schoolManagement";

export const metadata: Metadata = {
  title: "Project E-SIP",
  description: "Teacher View",
};

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user?.role !== "TEACHER") {
    redirect("/");
  }

  const school = await getSchool(session.user.schoolId!);

  if (school?.message.status === "Inactive") {
    redirect("/api/auth/signout");
  }

  return (
    <SchoolProvider>
      <Navbar role="TEACHER" />
      <div className="flex flex-col lg:min-h-[calc(100vh-73px)] ">
        <div className="flex-1 bg-white">{children}</div>
      </div>
    </SchoolProvider>
  );
}
