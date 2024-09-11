import Provider from "@/app/Provider";
import { auth } from "@/auth";
import Navbar from "@/components/(users)/navbar";
import Unauthorized from "@/components/UnAuthorized";
import type { Metadata } from "next";

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
    return <Unauthorized />;
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
