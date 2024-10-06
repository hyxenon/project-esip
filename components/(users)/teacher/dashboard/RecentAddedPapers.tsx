import { getRecentAddedPapers } from "@/actions/teacherDashboard.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bell, FileText, UsersIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Session } from "next-auth";
import Image from "next/image";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const RecentAddedPapers = async ({
  page,
  session,
  role,
}: {
  page?: string;
  session?: Session;
  role?: string;
}) => {
  const currentPage = page ? parseInt(page) : 1;
  const pageSize = 5;

  const { papers, totalCount } = await getRecentAddedPapers(
    session?.user?.schoolId!,
    currentPage,
    pageSize
  );

  const totalPages = Math.ceil(totalCount / pageSize);

  const formatAuthorName = (name: string) => {
    const nameParts = name.split(" ");
    const lastName = nameParts.pop();
    const initials = nameParts.map((part) => part[0]).join(". ") + ".";

    return `${initials} ${lastName}`;
  };

  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 lg:col-span-2">
      <CardHeader className="">
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-700">
            Recently Added Papers
          </CardTitle>
          <Bell className="h-5 w-5 text-blue-500" />
        </div>
        <CardDescription>Papers added this school year.</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-hidden">
        {papers.length === 0 ? (
          <div className="flex justify-center py-10">
            <p className="text-gray-500 text-center">
              No papers found. Please add a paper to see them here.
            </p>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-gray-200">
              {papers.map((paper) => (
                <li key={paper.id} className="py-3">
                  <p className="font-semibold text-gray-800">{paper.title}</p>
                  <p className="text-sm text-gray-600 capitalize flex gap-0.5">
                    {paper.researchCategory}
                  </p>
                  <span className="flex flex-wrap text-sm text-gray-600 capitalize items-center">
                    <UsersIcon className="w-4 h-4 mr-1" />
                    {paper.authors && paper.authors?.length > 0
                      ? paper.authors.map((author, index) => (
                          <span
                            key={author.id}
                            className="capitalize whitespace-nowrap text-sm mx-0.5"
                          >
                            {formatAuthorName(author.name)}
                            {index < paper.authors!.length - 1 ? ", " : ""}
                          </span>
                        ))
                      : "No Author"}
                  </span>
                  <div className="flex gap-0.5 mt-1 items-center">
                    <FileText className="h-4 w-4 mr-1 text-[#DDA15E]" />
                    <p className="text-xs text-gray-500 capitalize">
                      Research {paper.researchType}
                    </p>
                  </div>
                  {role === "admin" && (
                    <div className="flex gap-0.5 mt-1 items-center">
                      <Image
                        src={paper.user.school?.image!}
                        width={16}
                        height={16}
                        alt="school logo"
                        className="mr-1"
                      />
                      <p className="text-xs text-gray-500 capitalize">
                        {paper.user.school?.schoolName}
                      </p>
                    </div>
                  )}

                  <p className="text-xs text-gray-500 mt-1">
                    Submitted on:{" "}
                    {paper.date.toLocaleDateString("en-US", options)}
                  </p>
                </li>
              ))}
            </ul>
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious href={`?page=${1}`} />
                    </PaginationItem>
                  )}

                  {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        href={`?page=${index + 1}`}
                        isActive={currentPage === index + 1}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext href={`?page=${totalPages}`} />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentAddedPapers;
