// admin/layout.tsx
import SideNav from "@/components/(users)/admin/sidenav";
import type { Metadata } from "next";
import { SchoolProvider } from "@/context/SchoolContext"; // Adjust the path based on your context location
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin View",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }
  return (
    <SchoolProvider>
      <div className="flex h-full ">
        <SideNav role="ADMIN" />
        <div className="flex-1 overflow-y-auto bg-white">{children}</div>
      </div>
    </SchoolProvider>
  );
}
