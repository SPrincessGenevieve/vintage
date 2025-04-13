import React from "react";
import { TableBody, TableRow, TableCell, Table } from "../ui/table";
import { IndiciesType } from "@/app/context/UserContext";

export default function IndicesTableHeader({
  item,
  index,
}: {
  item: IndiciesType[];
  index: number;
}) {
  return (
    <Table className="text-[10px]">
      <TableBody>
        <TableRow>
          <TableCell className="p-0 py-2 text-center">Current Value</TableCell>
          <TableCell className="p-0 py-2 text-center">MoM</TableCell>
          <TableCell className="p-0 py-2 text-center">YTD</TableCell>
          <TableCell className="p-0 py-2 text-center">1yr</TableCell>
          <TableCell className="p-0 py-2 text-center">2yr</TableCell>
          <TableCell className="p-0 py-2 text-center">5yr</TableCell>
        </TableRow>
        <TableRow className="">
          <TableCell className="p-0 py-2 border-white border-t-gray-400 border text-center">
            {Number(Number(item[index].current_value).toFixed(0)).toLocaleString()}
          </TableCell>
          <TableCell
            className={`p-0 py-2 border-white border-t-gray-400 border text-center ${
              Number(item[index].mom) < 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            {item[index].mom}%
          </TableCell>
          <TableCell
            className={`p-0 py-2 border-white border-t-gray-400 border text-center ${
              Number(item[index].ytd) < 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            {item[index].ytd}%
          </TableCell>
          <TableCell
            className={`p-0 py-2 border-white border-t-gray-400 border text-center ${
              Number(item[index].one_years) < 0
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {item[index].one_years}%
          </TableCell>
          <TableCell
            className={`p-0 py-2 border-white border-t-gray-400 border text-center ${
              Number(item[index].two_years) < 0
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {item[index].two_years}%
          </TableCell>
          <TableCell
            className={`p-0 py-2 border-white border-t-gray-400 border text-center ${
              Number(item[index].five_years) < 0
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {item[index].five_years}%
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
