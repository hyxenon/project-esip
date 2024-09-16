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
  let searchPaperResults: ResearchPaperModel[] = [];

  if (searchParams?.query) {
    searchPaperResults = await searchPaper({ searchParams });
  }

  return (
    <div className="">
      <SearchComponent queryTitle={searchParams?.query} />
      {searchParams?.query && (
        <SearchResultsComponent papers={searchPaperResults} />
      )}
    </div>
  );
};

export default page;
