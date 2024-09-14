import { searchPaper } from "@/actions/search";
import { auth } from "@/auth";
import Navbar from "@/components/(users)/navbar";
import SearchComponent from "@/components/(users)/search/search";
import SearchResultsComponent from "@/components/(users)/search/SearchResultsComponent";
import { ResearchPaperModel } from "@/models/models";
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
  let searchPaperResults: ResearchPaperModel[] = [];

  if (searchParams?.query) {
    searchPaperResults = await searchPaper({ searchParams });
  }

  if (!session?.user) {
    return <div>no session found</div>;
  }

  return (
    <div>
      <Navbar role={session.user.role} />
      <div className="">
        <SearchComponent queryTitle={searchParams?.query} />
        {searchParams?.query && (
          <SearchResultsComponent papers={searchPaperResults} />
        )}
      </div>
    </div>
  );
};

export default page;
