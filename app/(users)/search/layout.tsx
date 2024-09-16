import type { Metadata } from "next";

import Navbar from "@/components/(users)/navbar";

import { auth } from "@/auth";
import Unauthorized from "@/components/UnAuthorized";

export const metadata: Metadata = {
  title: "Search Paper",
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

  return (
    <>
      <Navbar role={session.user.role} />
      <div>{children}</div>
    </>
  );
}
