import Provider from "@/app/Provider";
import Navbar from "@/components/(users)/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student",
  description: "Student View",
};

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <Provider>
        <Navbar role="STUDENT" />
        <div className="flex-1">{children}</div>
      </Provider>
    </div>
  );
}
