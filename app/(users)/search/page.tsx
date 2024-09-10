import { auth } from "@/auth";
import Navbar from "@/components/(users)/navbar";
import SearchComponent from "@/components/(users)/search/search";
import React from "react";

const page = async () => {
  const session = await auth();

  if (!session?.user) {
    return <div>no session found</div>;
  }

  return (
    <div>
      <Navbar role={session.user.role} />
      <div className="">
        <SearchComponent />
      </div>
    </div>
  );
};

export default page;
