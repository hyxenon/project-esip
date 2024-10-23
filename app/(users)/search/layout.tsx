import type { Metadata } from "next";

import Navbar from "@/components/(users)/navbar";

import { auth } from "@/auth";
import { getSchool } from "@/actions/schoolManagement";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Paper",
};

export default async function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    return <div>no session found</div>;
  }

  const school = await getSchool(session.user.schoolId!);

  if (school?.message.status === "Inactive") {
    redirect("/api/auth/signout");
  }

  return (
    <>
      <Navbar role={session.user.role} />
      <div className="">{children}</div>
    </>
  );
}
