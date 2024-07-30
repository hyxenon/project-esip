// admin/layout.tsx

import type { Metadata } from "next";
import { SchoolProvider } from "@/context/SchoolContext"; // Adjust the path based on your context location
import { UserManagementProvider } from "@/context/UserManagementContext";
import Navbar from "@/components/(users)/navbar";

export const metadata: Metadata = {
  title: "Teacher",
  description: "Teacher View",
};

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SchoolProvider>
      <UserManagementProvider>
        <div className="flex flex-col">
          <Navbar />
          <div className="flex-1">{children}</div>
        </div>
      </UserManagementProvider>
    </SchoolProvider>
  );
}
