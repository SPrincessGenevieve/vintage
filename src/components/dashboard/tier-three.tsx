import { AlertCircle, ChartLine, Wine } from "lucide-react";
import React from "react";
import Image from "next/image";
import { useUserContext } from "@/app/context/UserContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { UserData } from "@/lib/data/user";

export default function TierThree() {
  const itemsData = [
    "Picture",
    "Wine",
    "Vintage",
    "Purchase Date",
    "£ Gain / Loss",
  ];
  // const { investment } = useUserContext();
  const investment = UserData.investment;

  // Sort by value in descending order and take the top 5
  if (!investment) {
    return (
      <div className="w-full h-[95%] bg-white rounded-xl flex flex-col justify-center items-center">
        Loading...
      </div>
    ); // Show a loading message or spinner while data is being fetched
  }

  // Sort by value in descending order and take the top 5
  const topFiveWines = investment
    .sort(
      (a, b) =>
        (b.wines_investment_value || 0) - (a.wines_investment_value || 0)
    )
    .slice(0, 5);

  return (
    <>
      <div className="w-full h-[100%] bg-[white] rounded-xl flex flex-col">
        {/* Header Section */}
        <div className="p-2 py-4 w-full flex justify-between ">
          <div className="flex gap-2 items-center">
            <ChartLine color="#1BCD32" size={15} />
            <p className="text-[12px]">Top 5 Performing Wines</p>
          </div>
        </div>

        {/* Table Header */}
        <div className="w-full bg-[white] rounded-xl">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                {itemsData.map((item) => (
                  <TableCell
                    className={`text-center ${
                      item === "Wine" ? "text-left" : ""
                    }`}
                  >
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {topFiveWines.map((item) => (
                <>
                  <TableRow>
                    <TableCell className="p-0 flex justify-center items-center">
                      {item.wine_images &&
                      Array.isArray(item.wine_images) &&
                      item.wine_images.length > 0 ? (
                        <Image
                          className="w-auto h-[60px]"
                          src={item.wine_images[0]} // Accessing the first image if it's an array
                          alt={item.wine_name}
                          width={300}
                          height={300}
                        />
                      ) : (
                        <span>
                          <Wine />
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <p className="text-[12px] text-left flex items-center justify-left">
                        {item.wine_name}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-[12px] text-center flex items-center justify-center">
                        {item.vintage}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-[12px] text-center flex items-center justify-center">
                        {item.held}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-[12px] text-center flex items-center justify-center">
                        £
                        {Math.round(
                          Number(item.wines_investment_value)
                        ).toLocaleString()}
                      </p>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
