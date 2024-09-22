import { getRecentAddedPapers } from "@/actions/teacherDashboard.action";
import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bell, FileText, UsersIcon } from "lucide-react";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const RecentAddedPapers = async ({ page }: { page?: string }) => {
  const session = await auth();
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
            Recent Added Papers
          </CardTitle>
          <Bell className="h-5 w-5 text-blue-500" />
        </div>
        <CardDescription>Recent papers this school year.</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-hidden">
        <ul className="divide-y divide-gray-200">
          {papers.map((paper) => (
            <li key={paper.id} className="py-3">
              <p className="font-semibold text-gray-800">{paper.title}</p>
              <p className="text-sm text-gray-600 capitalize flex gap-0.5">
                {paper.researchCategory}
              </p>
              <span className="flex flex-wrap text-sm text-gray-600 capitalize items-center">
                <UsersIcon className="w-4 h-4 mr-2" />
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
                <FileText className="h-4 w-4 text-[#DDA15E]" />
                <p className="text-xs text-gray-500 capitalize">
                  Research {paper.researchType}
                </p>
              </div>

              <p className="text-xs text-gray-500 mt-1">
                Submitted on: {paper.date.toLocaleDateString("en-US", options)}
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
      </CardContent>
    </Card>
  );
};

export default RecentAddedPapers;
