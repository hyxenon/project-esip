import { searchPaper } from "@/actions/search";

import SearchComponent from "@/components/(users)/search/search";
import SearchResultsComponent from "@/components/(users)/search/SearchResultsComponent";
import { ResearchPaperModel } from "@/models/models";

const page = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    paperType?: string;
    categories?: string;
    page?: string;
  };
}) => {
  let searchPaperResults: ResearchPaperModel[] = [];
  let totalPages = 1;
  const currentPage = searchParams?.page ? parseInt(searchParams?.page) : 1;
  const pageSize = 10;
  if (searchParams?.query) {
    const { searchPaperResults: results, totalPages: total } =
      await searchPaper(pageSize, { searchParams });
    searchPaperResults = results;
    totalPages = total;
  }

  return (
    <div className="">
      <SearchComponent queryTitle={searchParams?.query} />
      {searchParams?.query && (
        <SearchResultsComponent
          papers={searchPaperResults}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default page;
