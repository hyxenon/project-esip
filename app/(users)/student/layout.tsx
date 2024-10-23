import { getSchool } from "@/actions/schoolManagement";
import Provider from "@/app/Provider";
import { auth } from "@/auth";
import Navbar from "@/components/(users)/navbar";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Student",
  description: "Student View",
};

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user?.role !== "STUDENT") {
    redirect("/");
  }

  const school = await getSchool(session.user.schoolId!);

  if (school?.message.status === "Inactive") {
    redirect("/api/auth/signout");
  }

  return (
    <div className="flex flex-col">
      <Provider>
        <Navbar role="STUDENT" />
        <div className="flex-1">{children}</div>
      </Provider>
    </div>
  );
}
