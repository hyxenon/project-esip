"use client";

import Navbar from "@/components/(users)/navbar";
import { useSession } from "next-auth/react";

const GrammarChecker = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session?.user?.role === "TEACHER" ||
      session?.user?.role === "STUDENT" ? (
        <Navbar role="TEACHER" />
      ) : (
        <Navbar role="STUDENT" />
      )}
    </div>
  );
};

export default GrammarChecker;
