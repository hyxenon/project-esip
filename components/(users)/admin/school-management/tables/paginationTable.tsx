import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

interface PaginationTableProps {
  table: any;
  pageIndex: any;
}

const PaginationTable = ({ table, pageIndex }: PaginationTableProps) => {
  const tableCount = table.getPageCount();

  const generatePageNumbers = () => {
    const pages = [];
    const maxPages = 5; // Number of pages to display
    let startPage = Math.max(1, pageIndex - Math.floor(maxPages / 2));

    if (pageIndex > tableCount - Math.floor(maxPages / 2)) {
      startPage = Math.max(1, tableCount - maxPages + 1);
    }

    for (
      let i = startPage;
      i <= Math.min(startPage + maxPages - 1, tableCount);
      i++
    ) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <Button
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
          variant={"link"}
        >
          <PaginationPrevious className="cursor-pointer" />
        </Button>

        {generatePageNumbers().map((pageNumber) => (
          <PaginationItem key={pageNumber} className="cursor-pointer">
            {pageNumber === pageIndex + 1 ? (
              <PaginationLink
                isActive
                onClick={() => table.setPageIndex(pageNumber - 1)}
              >
                {pageNumber}
              </PaginationLink>
            ) : (
              <PaginationLink
                onClick={() => table.setPageIndex(pageNumber - 1)}
              >
                {pageNumber}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <Button
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
          variant={"link"}
        >
          <PaginationNext className="cursor-pointer" />
        </Button>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationTable;
