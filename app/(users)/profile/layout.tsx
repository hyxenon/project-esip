import type { Metadata } from "next";

import Navbar from "@/components/(users)/navbar";

import { auth } from "@/auth";

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

  return (
    <>
      <Navbar role={session.user.role} />
      <div className="">{children}</div>
    </>
  );
}
