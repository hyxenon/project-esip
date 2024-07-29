// admin/layout.tsx
import SideNav from "@/components/(users)/admin/sidenav";
import type { Metadata } from "next";
import { SchoolProvider } from "@/context/SchoolContext"; // Adjust the path based on your context location
import { UserManagementProvider } from "@/context/UserManagementContext";

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
      <UserManagementProvider>
        <div className="flex h-full">
          <SideNav />
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </UserManagementProvider>
    </SchoolProvider>
  );
}
