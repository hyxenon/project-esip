import { searchPaper } from "@/actions/search";
import { auth } from "@/auth";
import Navbar from "@/components/(users)/navbar";
import SearchComponent from "@/components/(users)/search/search";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    paperType?: string;
    categories?: string;
  };
}) => {
  const session = await auth();

  if (searchParams?.query) {
    const searchPaperResults = await searchPaper({ searchParams });
    console.log(searchPaperResults);
  }

  if (!session?.user) {
    return <div>no session found</div>;
  }

  return (
    <div>
      <Navbar role={session.user.role} />
      <div className="">
        <SearchComponent queryTitle={searchParams?.query} />
      </div>
    </div>
  );
};

export default page;
