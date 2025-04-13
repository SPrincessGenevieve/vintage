"use client";
import Chart from "../chart";
import { MockChartData } from "@/lib/mock-data";
import ChartStatisticsCard from "./chart-statistics-card";
import { StatisticMock } from "@/lib/mock-data";
import rp_score from "@/icons/rp_score.png";
import drinking_win from "@/icons/drinking_window.png";
import reviewed_by from "@/icons/reviewed_by.png";
import review_date from "@/icons/review_date.png";
import Image from "next/image";
import { WineParentType, VintageWineType } from "@/app/context/UserContext";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { LinkApi } from "@/lib/utils";
import { useUserContext } from "@/app/context/UserContext";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface ChartType {
  item: VintageWineType;
  parent: WineParentType | null;
  region: string | string[] | undefined;
}

export default function WineChart({ item, parent, region }: ChartType) {
  const { selected_case_size, data_points, sessionkey, setUserDetails } =
    useUserContext();
  const lwin_11 = item.lwin11;

  useEffect(() => {
    async function fetchData() {
      if (!sessionkey) return;

      const authHeader = "Token " + sessionkey;

      try {
        // Fetch the first page to get the total number of pages and wine details
        const response = await axios.get(
          `${LinkApi.href}/data-points/${lwin_11}/`,
          {
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
          }
        );

        setUserDetails({
          data_points: response.data,
        });
      } catch (error) {
        console.error("Error fetching wine data:", error);
      } finally {
      }
    }

    fetchData();
  }, [sessionkey, lwin_11]);

  // Function to handle the "NA" value check
  const displayValue = (value: string | undefined) => {
    return value === "NA" ? "" : value || 0;
  };

  return (
    <div className="flex flex-1 w-full h-full border rounded-2xl bg-white chart-cont">
      <div className="flex h-auto w-[80%]  chart-cont-left">
        <Chart
          region={region}
          bottle_size={item.bottle_size}
          name={parent ? parent.name : ""}
          vintage={item.vintage}
          case_size={selected_case_size}
          item={data_points}
        />
      </div>
      <div className="p-4 grid grid-cols-2 gap-2 w-[20%] min-w-[250px] chart-cont-right">
        {/* {StatisticMock.map((item, index) => (
          <ChartStatisticsCard key={index} item={item} />
        ))} */}
        <div className="bg-[#F4F6F8] rounded-2xl flex items-center p-2">
          <div className="w-full flex flex-col">
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#555757"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-graph"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 18v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                <path d="M7 14l3 -3l2 2l3 -3l2 2" />
              </svg>
            </div>
            <div>
              <p className="text-muted-foreground  text-[12px]">
                Lifetime Performance
              </p>
                <p className={`gen-text-s text-[12px] text-black `}>
                  {displayValue(item.release_price)}
                </p>
            </div>
          </div>
        </div>
        <div className="bg-[#F4F6F8] rounded-2xl flex items-center p-2">
          <div className="w-full flex flex-col">
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#555757"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-glass-full"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M8 21l8 0" />
                <path d="M12 15l0 6" />
                <path d="M17 3l1 7c0 3.012 -2.686 5 -6 5s-6 -1.988 -6 -5l1 -7h10z" />
                <path d="M6 10a5 5 0 0 1 6 0a5 5 0 0 0 6 0" />
              </svg>
            </div>
            <div>
              <p className="text-muted-foreground  text-[12px]">
                Drinking Window
              </p>
              <p className={`gen-text-s text-[12px] text-[#45D658]`}>
                {displayValue(item.drinking_window)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#F4F6F8] rounded-2xl flex items-center p-2">
          <div className="w-full flex flex-col">
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#555757"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-file-check"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                <path d="M9 15l2 2l4 -4" />
              </svg>
            </div>
            <div>
              <p className="text-muted-foreground  text-[12px]">Reviewed by</p>
              <p className={`gen-text-s text-[12px] text-black`}>
                {displayValue(item.rp_reviewer)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#F4F6F8] rounded-2xl flex items-center p-2">
          <div className="w-full flex flex-col">
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#555757"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-check"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M11.5 21h-5.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6" />
                <path d="M16 3v4" />
                <path d="M8 3v4" />
                <path d="M4 11h16" />
                <path d="M15 19l2 2l4 -4" />
              </svg>
            </div>
            <div>
              <p className="text-muted-foreground  text-[12px]">Review date</p>
              <p className={`gen-text-s text-[12px] text-black`}>
                {displayValue(item.rp_released)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
