import {
  userSavedPapers,
  userSavedPapersWithDetails,
} from "@/actions/paperManagement.action";
import { getSchool } from "@/actions/schoolManagement";
import { auth } from "@/auth";
import Navbar from "@/components/(users)/navbar";
import SearchResultsComponent from "@/components/(users)/search/SearchResultsComponent";
import { redirect } from "next/navigation";

const Library = async ({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) => {
  const session = await auth();

  if (!session?.user) {
    return <div>no session found</div>;
  }

  const school = await getSchool(session.user.schoolId!);

  if (school?.message.status === "Inactive") {
    redirect("/api/auth/signout");
  }

  const currentPage = searchParams?.page ? parseInt(searchParams?.page) : 1;
  const perPage = 10;

  const { searchPaperResults: savedPapers, totalPages } =
    await userSavedPapersWithDetails(session.user.id!, perPage, currentPage);

  const savedPaperIds = await userSavedPapers(session?.user?.id!);

  return (
    <div>
      <Navbar role={session.user.role} />
      <h1 className="text-3xl mt-8 lg:mt-16 text-center">My Saved Papers</h1>
      <SearchResultsComponent
        papers={savedPapers}
        currentPage={currentPage}
        totalPages={totalPages}
        session={session}
        userSavedPapers={savedPaperIds}
      />
    </div>
  );
};

export default Library;
