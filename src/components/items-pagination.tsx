"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function ItemsPagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPage = Math.ceil(totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const renderPageNumbers = () => {
    if (lastPage <= 7) {
      return Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          className="rounded-lg py-4 h-7 w-7 text-[14px]"
          variant={page === currentPage ? "default" : "outline"}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ));
    }

    const pageNumbers = [];

    // First 6 pages
    if (currentPage <= 6) {
      for (let i = 1; i <= 6; i++) {
        pageNumbers.push(
          <Button
            key={i}
            className="rounded-lg py-4 h-7 w-7 text-[14px]"
            variant={i === currentPage ? "default" : "outline"}
            onClick={() => onPageChange(i)}
          >
            {i}
          </Button>
        );
      }
      pageNumbers.push(
        <PaginationEllipsis key="ellipsis1" />
      );
      pageNumbers.push(
        <Button
          key={lastPage}
          className="rounded-lg py-4 h-7 w-7 text-[14px]"
          variant="outline"
          onClick={() => onPageChange(lastPage)}
        >
          {lastPage}
        </Button>
      );
    }
    // Last 6 pages
    else if (currentPage >= lastPage - 5) {
      pageNumbers.push(
        <Button
          key={1}
          className="rounded-lg py-4 h-7 w-7 text-[14px]"
          variant="outline"
          onClick={() => onPageChange(1)}
        >
          1
        </Button>
      );
      pageNumbers.push(
        <PaginationEllipsis key="ellipsis1" />
      );

      for (let i = lastPage - 5; i <= lastPage; i++) {
        pageNumbers.push(
          <Button
            key={i}
            className="rounded-lg py-4 h-7 w-7 text-[14px]"
            variant={i === currentPage ? "default" : "outline"}
            onClick={() => onPageChange(i)}
          >
            {i}
          </Button>
        );
      }
    }
    // Middle pages
    else {
      pageNumbers.push(
        <Button
          key={1}
          className="rounded-lg py-4 h-7 w-7 text-[14px]"
          variant="outline"
          onClick={() => onPageChange(1)}
        >
          1
        </Button>
      );
      pageNumbers.push(
        <PaginationEllipsis key="ellipsis1" />
      );

      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pageNumbers.push(
          <Button
            key={i}
            className="rounded-lg py-4 h-7 w-7 text-[14px]"
            variant={i === currentPage ? "default" : "outline"}
            onClick={() => onPageChange(i)}
          >
            {i}
          </Button>
        );
      }

      pageNumbers.push(
        <PaginationEllipsis key="ellipsis2" />
      );
      pageNumbers.push(
        <Button
          key={lastPage}
          className="rounded-lg py-4 h-7 w-7 text-[14px]"
          variant="outline"
          onClick={() => onPageChange(lastPage)}
        >
          {lastPage}
        </Button>
      );
    }

    return pageNumbers;
  };

  return (
    <Pagination>
      <PaginationContent>
        <Button
          className="rounded-lg py-4 h-8"
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft size="20" />
        </Button>

        {renderPageNumbers()}

        <Button
          className="rounded-lg py-4 h-8"
          variant="outline"
          disabled={currentPage === lastPage}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight size="17" />
        </Button>
      </PaginationContent>
    </Pagination>
  );
}
