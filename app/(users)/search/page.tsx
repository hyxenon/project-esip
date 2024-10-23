import { userSavedPapers } from "@/actions/paperManagement.action";
import { getSchool } from "@/actions/schoolManagement";
import { searchPaper } from "@/actions/search";
import { auth } from "@/auth";

import SearchComponent from "@/components/(users)/search/search";
import SearchResultsComponent from "@/components/(users)/search/SearchResultsComponent";
import { ResearchPaperModel } from "@/models/models";
import { redirect } from "next/navigation";

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
  const session = await auth();

  if (!session?.user) {
    return <p>Session not found</p>;
  }

  const school = await getSchool(session.user.schoolId!);

  if (school?.message.status === "Inactive") {
    redirect("/api/auth/signout");
  }

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

  const savedPaperIds = await userSavedPapers(session?.user?.id!);

  return (
    <div className="">
      <SearchComponent queryTitle={searchParams?.query} />
      {searchParams?.query && (
        <SearchResultsComponent
          papers={searchPaperResults}
          currentPage={currentPage}
          totalPages={totalPages}
          session={session}
          userSavedPapers={savedPaperIds}
        />
      )}
    </div>
  );
};

export default page;
