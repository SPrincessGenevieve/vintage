"use client";
import React, { useState, useMemo } from "react";
import PortIcon from "@/images/port";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useUserContext } from "@/app/context/UserContext";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Input } from "../ui/input";
import { ChevronDown } from "lucide-react";
import { UserData } from "@/lib/data/user";

export default function TierTwo() {
  // const { portfolio_performance } = useUserContext();
  const portfolio_performance = UserData.portfolio_performance

  // Time filter options
  const timeFilters = {
    "6 months": 6,
    "1 year": 12,
    "3 years": 36,
    "5 years": 60,
  } as const;

  // Default selection is 6 months
  const [selectedFilter, setSelectedFilter] =
    useState<keyof typeof timeFilters>("5 years");

  // Filter data based on the selected time range
  const filteredData = useMemo(() => {
    if (!portfolio_performance || !Array.isArray(portfolio_performance)) {
      // Return an empty array or handle the undefined state however you need
      return [];
    }

    const today = new Date();
    const filteredMonths = timeFilters[selectedFilter]; // Use the selected filter to get the number of months
    const cutoffDate = new Date(
      today.setMonth(today.getMonth() - filteredMonths)
    );

    return portfolio_performance.filter(
      (item) => new Date(item.date) >= cutoffDate
    );
  }, [portfolio_performance, selectedFilter]);

  const minimalConfig = {};

  const minValue = Math.min(...filteredData.map((item) => item.value ?? 0));
  const maxValue = Math.max(...filteredData.map((item) => item.value ?? 0));

  const domainMinValue = minValue - (maxValue - minValue) * 0.05;
  const domainMaxValue = maxValue + (maxValue - minValue) * 0.15;
  const range = maxValue - minValue;

  // Determine the best increment based on the data range
  let increment;
  if (range <= 500) {
    increment = 50;
  } else if (range <= 2000) {
    increment = 100;
  } else if (range <= 5000) {
    increment = 500;
  } else {
    increment = 1000;
  }
  return (
    <div className="flex flex-col w-full h-full gap-2 relative">
      <div className="flex w-auto h-[10%] gap-2 justify-between items-center">
        <div className="w-full flex gap-2 items-center">
          <PortIcon strokeColor="#7351C2" />
          <p className="text-[12px]">Portfolio Performance</p>
        </div>
        <Menubar className="p-0 m-0 h-auto">
          <MenubarMenu>
            <MenubarTrigger className="flex min-w-[140px] justify-between p-0 px-2 border">
              <p className="text-[12px]">{selectedFilter}</p>
              <ChevronDown size={15} />
            </MenubarTrigger>
            <MenubarContent>
              {Object.keys(timeFilters).map((action) => (
                <MenubarCheckboxItem
                  key={action}
                  checked={action === selectedFilter}
                  onClick={() =>
                    setSelectedFilter(action as keyof typeof timeFilters)
                  }
                >
                  <p className="text-[12px]">
                    {action.charAt(0).toUpperCase() + action.slice(1)}
                  </p>
                </MenubarCheckboxItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      <div className="w-full relative h-[90%] overflow-x-auto  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <ChartContainer
          config={minimalConfig}
          className="aspect-auto w-full h-[100%] pr-5 absolute"
        >
          <AreaChart data={filteredData} className="w-[1200px] h-full">
            <defs>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7351C2" stopOpacity={1} />
                <stop offset="90%" stopColor="white" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={5}
              padding={{ right: 15 }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                });
              }}
              fontSize={8}
              angle={-45}
              dy={2}
            />

            <YAxis
              domain={[
                Math.floor(
                  Math.min(
                    ...filteredData.map((item: any) => item.value ?? 0)
                  ) / increment
                ) * increment, // Round down to nearest increment
                Math.ceil(domainMaxValue / increment) * increment, // Round up to nearest increment
              ]}
              fontSize={9}
              tickCount={10}
              tickMargin={5}
              tickFormatter={(value) => value.toLocaleString()} // Format ticks with commas
              allowDataOverflow={true}
              label={{
                angle: -90, // Rotate label to be vertical
                style: { textAnchor: "middle" }, // Center the label
              }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    });
                  }}
                  formatter={(value) => [
                    `£${Number(Number(value).toFixed(0)).toLocaleString()}`,
                  ]}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="value"
              type="monotone"
              fill="url(#fillMobile)"
              stroke="#7351C2"
              strokeWidth={1}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}
