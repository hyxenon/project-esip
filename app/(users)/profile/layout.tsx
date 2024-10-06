import type { Metadata } from "next";

import Navbar from "@/components/(users)/navbar";

import { auth } from "@/auth";
import SideNav from "@/components/(users)/admin/sidenav";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile Details",
};

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    return <div>no session found</div>;
  }

  if (session.user.role !== "ADMIN") {
    return (
      <>
        <Navbar role={session.user.role} />
        <div className="pb-8">{children}</div>
      </>
    );
  }

  return (
    <div className="flex h-full">
      <SideNav role="ADMIN" />
      <div className="flex-1 overflow-y-auto bg-white pb-8">{children}</div>
    </div>
  );
}
