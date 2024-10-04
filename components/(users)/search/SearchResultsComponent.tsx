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

interface SearchResultsComponentProps {
  papers: ResearchPaperModel[];

  totalPages: number;
  currentPage: number;
}

const SearchResultsComponent = ({
  papers,
  totalPages,
  currentPage,
}: SearchResultsComponentProps) => {
  const searchParams = useSearchParams();

  const buildPaginationLink = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="px-4 md:container space-y-4 py-8">
      {papers.length > 0 ? (
        papers.map((paper) => <PaperCard key={paper.id} paper={paper} />)
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

            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href={buildPaginationLink(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
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
