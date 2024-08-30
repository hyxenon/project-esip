// admin/layout.tsx
import SideNav from "@/components/(users)/admin/sidenav";
import type { Metadata } from "next";
import { SchoolProvider } from "@/context/SchoolContext"; // Adjust the path based on your context location

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin View",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SchoolProvider>
      <div className="flex h-full ">
        <SideNav role="ADMIN" />
        <div className="flex-1 overflow-y-auto bg-gray-50">{children}</div>
      </div>
    </SchoolProvider>
  );
}
