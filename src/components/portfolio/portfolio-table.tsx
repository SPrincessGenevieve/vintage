import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { TableData } from "../table-data";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowDownUp, ArrowUpDown, EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { investment } from "@/lib/data/investment";
import { InvestmentType } from "@/lib/types";
import PortfolioManage from "./portfolio-manage";

export default function PortfolioTable() {
  const [isFiltered, setIsFiltered] = useState(false);

  const handleFilter = () => {};

  const handleFilter2 = () => {};

  const columns: ColumnDef<InvestmentType, unknown>[] = [
    {
      accessorKey: "wine_image",
      header: () => (
        <div className="text-center text-gray-400 font-light text-[12px]">
          Picture
        </div>
      ),
      cell: ({ row }) => {
        const wine_parent = row.original.wine_parent;
        const basket_parent = row.original.basket_details?.image;
        const image = wine_parent ? wine_parent.images[0] : basket_parent;
        const basket_list = row.original.basket_details;
        const index_num = row.index;
        return (
          <Link
            href={
              basket_list === null
                ? `/dashboard/portfolio/${index_num}`
                : `/dashboard/portfolio/bundle/${index_num}`
            }
          >
            <div className="flex justify-center">
              <Image
                src={image ?? "/default-image.png"}
                width={300}
                height={300}
                alt={`${image}`}
                className="w-auto h-[10vh] rounded-full"
              />
            </div>
          </Link>
        );
      },
    },
    {
      accessorKey: "name",
      header: () => (
        <div className="text-left text-gray-400 font-light text-[12px]">
          Name
        </div>
      ),
      cell: ({ getValue, row }) => {
        const basket_list = row.original.basket_details;
        const name = row.original.wine_parent
          ? row.original.wine_parent?.name
          : row.original.basket_details?.name;
        const index_num = row.index;

        return (
          <Link
            href={
              basket_list === null
                ? `/dashboard/portfolio/${index_num}`
                : `/dashboard/portfolio/bundle/${index_num}`
            }
          >
            <div className="flex justify-left text-left text-[12px]">
              {name}
            </div>
          </Link>
        );
      },
    },
    {
      accessorKey: "sub_account",
      header: () => (
        <div className="text-left text-gray-400 font-light text-[12px]">
          Sub-account
        </div>
      ),
      cell: ({ getValue, row }) => {
        const basket_list = row.original.basket_details;
        const index_num = row.index;

        const owner =
          row.original.sub_account === null
            ? "Main Account"
            : row.original.sub_account;
        return (
          <Link
            href={
              basket_list === null
                ? `/dashboard/portfolio/${index_num}`
                : `/dashboard/portfolio/bundle/${index_num}`
            }
          >
            <div className="flex justify-left text-[12px]">{owner}</div>
          </Link>
        );
      },
    },
    {
      accessorKey: "vintage",
      header: () => (
        <div className="text-center text-gray-400 font-light text-[12px]">
          Vintage
        </div>
      ),
      cell: ({ getValue, row }) => {
        const basket_list = row.original.basket_details;
        const vintage = row.original.wine_vintage;
        const index_num = row.index;

        return (
          <Link
            href={
              basket_list === null
                ? `/dashboard/portfolio/${index_num}`
                : `/dashboard/portfolio/bundle/${index_num}`
            }
          >
            <div className="flex justify-center text-[12px]">
              {vintage === 0 ? "---" : vintage}
            </div>
          </Link>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: () => (
        <div className="text-center text-gray-400 font-light text-[12px]">
          # of Cases
        </div>
      ),
      cell: ({ getValue, row }) => {
        const basket_list = row.original.basket_details;
        const index_num = row.index;

        return (
          <Link
            href={
              basket_list === null
                ? `/dashboard/portfolio/${index_num}`
                : `/dashboard/portfolio/bundle/${index_num}`
            }
          >
            <div className="flex justify-center text-[12px]">
              {getValue() as string}
            </div>
          </Link>
        );
      },
    },
    {
      accessorKey: "case_size",
      header: () => (
        <div className="text-center text-gray-400 font-light text-[12px]">
          <p className=" text-[12px]">Case Size</p>
        </div>
      ),
      cell: ({ getValue, row }) => {
        const basket_list = row.original.basket_details;
        const index_num = row.index;

        return (
          <Link
            href={
              basket_list === null
                ? `/dashboard/portfolio/${index_num}`
                : `/dashboard/portfolio/bundle/${index_num}`
            }
            className="w-full"
          >
            <div className="flex justify-center text-center text-[12px]">
              {getValue() as string}
            </div>
          </Link>
        );
      },
    },
    {
      accessorKey: "investment",
      header: () => (
        <div className="text-center text-gray-400  font-light flex items-center justify-center text-[12px]">
          <p className=" text-[12px] text-center ">Purchase Price</p>
          {/* <Button variant="ghost" className="p-0 ml-2">
            <ArrowUpDown strokeWidth={1} className="asc-icon"></ArrowUpDown>
          </Button> */}
        </div>
      ),
      cell: ({ getValue, row }) => {
        const investment = parseFloat(row.original.investment);
        const basket_list = row.original.basket_details;

        // Ensure it's a whole number
        const wholeInvestment = Math.floor(investment); // Or use Math.round(investment) if you want rounding

        // Format the number with commas
        const formattedInvestment = wholeInvestment.toLocaleString();
        const index_num = row.index;

        return (
          <Link
            href={
              basket_list === null
                ? `/dashboard/portfolio/${index_num}`
                : `/dashboard/portfolio/bundle/${index_num}`
            }
          >
            <div className="flex justify-center text-[12px]">
              £ {formattedInvestment}
            </div>
          </Link>
        );
      },
    },
    {
      accessorKey: "market_value",
      header: () => (
        <div className="text-center flex items-center justify-center text-gray-400 font-light text-[12px]">
          Market Price
        </div>
      ),
      cell: ({ getValue, row }) => {
        // Ensure market_value is a number, or fallback to 0 if it's null/undefined
        const basket_list = row.original.basket_details;
        const market_value = Number(row.original.market_value) || 0;

        // Round the number to a whole number and format with commas
        const formattedValue = Math.floor(market_value) // or Math.round(market_value) if you want to round
          .toLocaleString(); // Add commas for thousands
        const index_num = row.index;

        return (
          <Link
            href={
              basket_list === null
                ? `/dashboard/portfolio/${index_num}`
                : `/dashboard/portfolio/bundle/${index_num}`
            }
          >
            <div className="text-[12px] flex justify-center">
              £ {formattedValue}
            </div>
          </Link>
        );
      },
    },
    {
      accessorKey: "profit_lost_by_percent",
      header: () => (
        <div className="text-center text-gray-400 flex justify-center items-center gap-2">
          <p className="font-light text-[12px]">% Gain / Loss</p>{" "}
          <Button onClick={handleFilter} variant="ghost" className="p-0">
            {isFiltered ? (
              <ArrowUpDown color="gray"></ArrowUpDown>
            ) : (
              <ArrowDownUp></ArrowDownUp>
            )}
          </Button>
        </div>
      ),
      cell: ({ getValue, row }) => {
        // const gainLoss = Math.floor(row.original.profit_lost_by_percent) || 0;
        const gainLoss = Number(row.original.profit_lost_by_percent.toFixed(2));
        // const gainLoss = Number(row.original.profit_lost_by_percent.toFixed(0))
        const textColor = gainLoss < 0 ? "text-red-500" : "text-green-500";
        const basket_list = row.original.basket_details;
        const index_num = row.index;

        return (
          <Link
            href={
              basket_list === null
                ? `/dashboard/portfolio/${index_num}`
                : `/dashboard/portfolio/bundle/${index_num}`
            }
          >
            <div
              className={` text-[12px] flex justify-center indent-7 ${textColor}`}
            >
              {gainLoss === -0 ? 0 : gainLoss}%
            </div>
          </Link>
        );
      },
    },

    {
      accessorKey: "profit_lost",
      header: () => (
        <div className="text-center text-gray-400 flex justify-center items-center gap-2">
          <p className="font-light text-[12px]">£ Gain / Loss</p>{" "}
          <Button onClick={handleFilter2} variant="ghost" className="p-0">
            {isFiltered ? (
              <ArrowUpDown color="gray"></ArrowUpDown>
            ) : (
              <ArrowDownUp></ArrowDownUp>
            )}
          </Button>
        </div>
      ),
      cell: ({ getValue, row }) => {
        // const gainLossPer = Math.floor(row.original.profit_lost);
        const gainLossPer = Number(row.original.profit_lost.toFixed(0));
        // const gainLossPer = Number(row.original.profit_lost.toFixed(2))
        const textColor = gainLossPer < 0 ? "text-red-500" : "text-green-500";
        const basket_list = row.original.basket_details;

        // Format the number with commas
        const formattedGainLoss =
          gainLossPer === -0 ? 0 : gainLossPer.toLocaleString();
        const index_num = row.index;

        return (
          <Link
            href={
              basket_list === null
                ? `/dashboard/portfolio/${index_num}`
                : `/dashboard/portfolio/bundle/${index_num}`
            }
          >
            <div
              className={`text-[12px] flex justify-center indent-7 ${textColor}`}
            >
              £{formattedGainLoss}
            </div>
          </Link>
        );
      },
    },
    {
      accessorKey: "investment_status",
      header: () => (
        <div className="text-center text-gray-400 font-light text-[12px]">
          <p className="text-[12px]">Status</p>
        </div>
      ),
      cell: ({ getValue, row }) => {
        const status_original = getValue() as string;
        const quantity = row.original.quantity;
        const basket_list = row.original.basket_details;
        const index_num = row.index;

        const status =
          quantity === 0
            ? "Request for Transfer"
            : status_original === "pending"
            ? "Awaiting Arrival"
            : status_original === "owned"
            ? "Owned"
            : status_original === "for_sale"
            ? "For Sale"
            : status_original === "idle"
            ? "Pending"
            : status_original;

        return (
          <Link
            href={
              basket_list === null
                ? `/dashboard/portfolio/${index_num}`
                : `/dashboard/portfolio/bundle/${index_num}`
            }
            className="w-full"
          >
            <div className="flex justify-center text-center text-[12px]">
              {status}
            </div>
          </Link>
        );
      },
    },
    {
      id: "action",
      header: () => (
        <div className="text-center text-gray-400 font-light flex items-center justify-center">
          <p className=" text-[12px]"></p>
        </div>
      ),
      cell: ({ row }) => {
        const basket_list = row.original.basket_details;
        const investment_id = row.original.id || 0;
        const parent = row.original.wine_parent;
        return (
          <button className="flex items-center justify-center w-full">
            <div className="flex justify-center">
              <PortfolioManage
                investment_id={investment_id}
                item={row.original}
                triggerContent={
                  <div>
                    <Button variant="ghost">
                      <EllipsisVertical className="ellipsis" />
                    </Button>
                  </div>
                }
              />
            </div>
          </button>
        );
      },
    },
  ];

  const [pageSize, setPageSize] = useState(8); // Default page size

  return (
    <div className="flex flex-col w-full h-[full]">
      <TableData pageSize={pageSize} columns={columns} data={investment} />
    </div>
  );
}
