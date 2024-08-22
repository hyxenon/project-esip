import type { Metadata } from "next";

import Navbar from "@/components/(users)/navbar";
import { TeacherUserManagementProvider } from "@/context/TeacherUserManagementContext";
import { UserManagementProvider } from "@/context/UserManagementContext";
import { SchoolProvider } from "@/context/SchoolContext";

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
        <TeacherUserManagementProvider>
          <Navbar role="TEACHER" />
          <div className="flex flex-col py-4 lg:min-h-[calc(100vh-79px)] ">
            <div className="flex-1">{children}</div>
          </div>
        </TeacherUserManagementProvider>
      </UserManagementProvider>
    </SchoolProvider>
  );
}
