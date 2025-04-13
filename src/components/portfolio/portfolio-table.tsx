import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { TableData } from "../table-data";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowDownUp, ArrowUpDown, EllipsisVertical } from "lucide-react";
import PortfolioManage from "./portfolio-manage";
import Link from "next/link";
import {
  PortfolioType,
  useUserContext,
  VintageWineType,
  WineParentType,
} from "@/app/context/UserContext";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { InvestmentListType } from "@/app/context/UserContext";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function PortfolioTable({
  portfolio,
  parent,
}: {
  portfolio: PortfolioType[];
  parent: WineParentType;
}) {
  const { setUserDetails, sessionkey, user_now_id, gain_loss_filter } =
    useUserContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [isGiftDisabled, setIsGiftDisabled] = useState(false);
  const [isSellDisabled, setIsSellDisabled] = useState(false);
  const [isDeliveryDisabled, setIsDeliveryDisabled] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);
  const [investment_list, setInvestmentList] = useState<InvestmentListType[]>(
    []
  );
  const [portfolio_link, setPortfolioLink] = useState("");
  const authHeader = "Token " + sessionkey;

  useEffect(() => {
    const updatedInvestmentList = portfolio.map((item) => ({
      id: item.id,
      wine_name:
        item.basket_details === null
          ? item.wine_parent?.name ?? ""
          : item.basket_details.name,
      bottle_size:
        item.basket_details === null
          ? item.wine_vintage_details?.bottle_size
          : "",
      investment: item.investment,
      wine_vintage: item.wine_vintage,
      quantity: item.quantity,
      case_size: item.case_size,
      market_value: item.market_value,
      profit_lost: item.profit_lost,
      profit_lost_by_percent: item.profit_lost_by_percent,
      investment_status: item.investment_status,
      quantity_to_sell: item.quantity_to_sell,
      quantity_to_transfer: item.quantity_to_transfer,
      sub_account: item.sub_account,
      wine_image:
        item.basket_details === null
          ? item.wine_parent.images[0]
          : item.basket_details.image,
      vintage:
        item.basket_details === null
          ? item.wine_vintage_details?.vintage ?? 0 // Ensure vintage is a number
          : item.wine_vintage_details?.vintage ?? 0, // Default to 0 if null or undefined
      wine_vintage_details: item.wine_vintage_details,
      wine_parent: item.wine_parent,
      basket_details: item.basket_details,
      basket_items: item.basket_items,
    }));
    const portfolioLink = portfolio.map((item) => {
      item.basket_details;
    });
    setInvestmentList(updatedInvestmentList);
  }, [portfolio]);

  const handleFilter = () => {
    setIsFiltered(!isFiltered);
    setUserDetails({
      gain_loss_filter: isFiltered,
    });
  };

  const handleFilter2 = () => {
    setIsFiltered(!isFiltered);
    setUserDetails({
      gain_loss_filter: isFiltered,
    });
  };

  const filteredData = Array.isArray(portfolio)
    ? portfolio.filter((portfolioItem) => {
        const search = searchTerm.toLowerCase();
        const matchesName = portfolioItem.wine_vintage_details?.name
          .toLowerCase()
          .includes(search);
        const matchesVintage = portfolioItem.wine_vintage_details?.vintage
          .toString()
          .toLowerCase()
          .includes(search);
        return matchesName || matchesVintage;
      })
    : []; // If not an array, return an empty array



  const columns: ColumnDef<InvestmentListType, unknown>[] = [
    {
      accessorKey: "wine_image",
      header: () => (
        <div className="text-center text-gray-400 font-light text-[12px]">
          Picture
        </div>
      ),
      cell: ({ row }) => {
        const image = row.original.wine_image;
        const basket_list = row.original.basket_details;
        return (
          <Link
            href={
              basket_list === null
                ? `/dashboard/portfolio/${row.original.id}`
                : `/dashboard/portfolio/bundle/${row.original.id}`
            }
          >
            <div className="flex justify-center">
              <Image
                src={image}
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
      accessorKey: "wine_name",
      header: () => (
        <div className="text-left text-gray-400 font-light text-[12px]">
          Name
        </div>
      ),
      cell: ({ getValue, row }) => {
        const basket_list = row.original.basket_details;
        const lwin = row.original.id;

        return (
          <Link
            href={
              basket_list === null
                ? `/dashboard/portfolio/${row.original.id}`
                : `/dashboard/portfolio/bundle/${row.original.id}`
            }
          >
            <div className="flex justify-left text-[12px]">
              {getValue() as string}
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

        const owner =
          row.original.sub_account === null
            ? "Main Account"
            : row.original.sub_account;
        return (
          <Link
            href={
              basket_list === null
                ? `/dashboard/portfolio/${row.original.id}`
                : `/dashboard/portfolio/bundle/${row.original.id}`
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
        const vintage = row.original.vintage;
        return (
          <Link
            href={
              basket_list === null
                ? `/dashboard/portfolio/${row.original.id}`
                : `/dashboard/portfolio/bundle/${row.original.id}`
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
        return (
          <Link
            href={
              basket_list === null
                ? `/dashboard/portfolio/${row.original.id}`
                : `/dashboard/portfolio/bundle/${row.original.id}`
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

        return (
          <Link
            href={
              basket_list === null
                ? `/dashboard/portfolio/${row.original.id}`
                : `/dashboard/portfolio/bundle/${row.original.id}`
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

        return (
          <Link
            href={
              basket_list === null
                ? `/dashboard/portfolio/${row.original.id}`
                : `/dashboard/portfolio/bundle/${row.original.id}`
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

        return (
          <Link
            href={
              basket_list === null
                ? `/dashboard/portfolio/${row.original.id}`
                : `/dashboard/portfolio/bundle/${row.original.id}`
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

        return (
          <Link
            href={
              basket_list === null
                ? `/dashboard/portfolio/${row.original.id}`
                : `/dashboard/portfolio/bundle/${row.original.id}`
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

        return (
          <Link
            href={
              basket_list === null
                ? `/dashboard/portfolio/${row.original.id}`
                : `/dashboard/portfolio/bundle/${row.original.id}`
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
                ? `/dashboard/portfolio/${row.original.id}`
                : `/dashboard/portfolio/bundle/${row.original.id}`
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
        return (
          <button className="flex items-center justify-center w-full">
            <div className="flex justify-center">
              <PortfolioManage
                investment_id={investment_id}
                item={row.original}
                parent={parent}
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
      <TableData pageSize={pageSize} columns={columns} data={investment_list} />
    </div>
  );
}
