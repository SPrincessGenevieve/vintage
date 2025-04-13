"use client";
import React, { useState, useEffect } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import "./../app/globals.css";

interface DataTableProps<T> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  pageSize?: number; // Make pageSize optional, with a default value if not provided
  minHeight?: string; // Add minHeight as an optional prop
  paginationClassName?: string;
  currentPage?: number; // Optional currentPage prop
  onPageChange?: (pageIndex: number) => void; // Optional onPageChange callback prop
}

export function TableData<T>({
  columns,
  data,
  pageSize = 10,
  minHeight = "65vh",
  paginationClassName = "",
  currentPage = 0, // Default to 0 if no currentPage is provided
  onPageChange,
}: DataTableProps<T>) {
  const [pageIndex, setPageIndex] = useState(currentPage); // Initialize with currentPage prop

  // Effect to update pageIndex when currentPage prop changes
  useEffect(() => {
    setPageIndex(currentPage);
  }, [currentPage]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        setPageIndex((old) => updater({ pageIndex: old, pageSize }).pageIndex);
      } else {
        setPageIndex(updater.pageIndex);
      }
    },
  });

  const currentPageData = table.getRowModel().rows;
  const totalPages = table.getPageCount();

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 6;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(0, pageIndex - halfVisible);
    let endPage = Math.min(totalPages - 1, pageIndex + halfVisible);

    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage > 0) {
        startPage = Math.max(0, endPage - maxVisiblePages + 1);
      } else {
        endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (totalPages > maxVisiblePages) {
      if (typeof pageNumbers[0] === "number" && pageNumbers[0] > 0) {
        pageNumbers.unshift("...");
      }
      const lastElement = pageNumbers[pageNumbers.length - 1];
      if (typeof lastElement === "number" && lastElement < totalPages - 1) {
        pageNumbers.push("...");
      }
    }

    if (totalPages > maxVisiblePages && !pageNumbers.includes(totalPages - 1)) {
      pageNumbers.push(totalPages - 1);
    }

    return pageNumbers;
  };

  // Call onPageChange prop if available
  const handlePageChange = (newPageIndex: number) => {
    setPageIndex(newPageIndex);
    if (onPageChange) {
      onPageChange(newPageIndex);
    }
  };

  

  return (
    <div className="w-full h-auto flex flex-col" style={{ minHeight }}>
      <div className="flex-grow overflow-auto w-full">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-transparent hover:bg-transparent text-black">
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={
                      [
                        "sub-accounts",
                        "name",
                        "investment",
                        "contact",
                        "level",
                        "actions",
                        "picture",
                        "profit",
                        "id",
                      ].includes(header.column.id)
                        ? "text-center text-white"
                        : ""
                    }
                    style={
                      header.column.id === "contact"
                        ? { width: "200px" }
                        : header.column.id === "picture"
                        ? { width: "100px" }
                        : {}
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPageData.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={
                      [
                        "sub-accounts",
                        "name",
                        "investment",
                        "level",
                        "contact",
                        "profit",
                        "actions",
                        "picture",
                        "id",
                      ].includes(cell.column.id)
                        ? "text-center"
                        : ""
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* <div className="w-full flex justify-center items-center">
        <div
          className={`page-cont-btn  ${paginationClassName}`}
        >
          <Pagination>
            <PaginationContent>
              {getPageNumbers().map((page, index) => (
                <PaginationItem key={index}>
                  {page === "..." ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href="#"
                      onClick={() => handlePageChange(Number(page))}
                      className={
                        page === pageIndex
                          ? " rounded-lg border-2 border-[#104144] bg-[#104144] text-white hover:bg-[#104144] hover:text-white"
                          : " rounded-lg border-2 border-grey-300 hover:bg-[#104144] hover:text-white"
                      }
                    >
                      {Number(page) + 1}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>
      </div> */}
    </div>
  );
}
