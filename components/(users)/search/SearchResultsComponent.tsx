"use client";
import { ResearchPaperModel } from "@/models/models";
import PaperCard from "./PaperCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import { Session } from "next-auth";

interface SearchResultsComponentProps {
  papers: ResearchPaperModel[];
  totalPages: number;
  currentPage: number;
  session: Session;
  userSavedPapers: string[];
}

const SearchResultsComponent = ({
  papers,
  totalPages,
  currentPage,
  session,
  userSavedPapers,
}: SearchResultsComponentProps) => {
  const searchParams = useSearchParams();
  const paginationSize = 5;

  const buildPaginationLink = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  const startPage = Math.max(1, currentPage - Math.floor(paginationSize / 2));
  const endPage = Math.min(totalPages, startPage + paginationSize - 1);

  return (
    <div className="px-4 md:container space-y-8 py-8 md:mt-8">
      {papers.length > 0 ? (
        papers.map((paper) => (
          <PaperCard
            key={paper.id}
            paper={paper}
            session={session}
            userSavedPapers={userSavedPapers}
          />
        ))
      ) : (
        <h1 className="text-center">No Paper Found.</h1>
      )}

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious href={buildPaginationLink(1)} />
              </PaginationItem>
            )}

            {[...Array(endPage - startPage + 1)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href={buildPaginationLink(startPage + index)}
                  isActive={currentPage === startPage + index}
                >
                  {startPage + index}
                </PaginationLink>
              </PaginationItem>
            ))}

            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext href={buildPaginationLink(totalPages)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default SearchResultsComponent;
