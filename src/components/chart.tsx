"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React, { useEffect, useState, useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import clsx from "clsx"; // Importing clsx for conditional className merging
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { BookText } from "lucide-react";

interface ChartProps {
  item: { monthly: any[]; yearly: any[] }; // Simplified type
  className?: string; // className prop for custom styling
  case_size: number;
  bottle_size?: string;
  name: string;
  vintage: number;
  isSpecial?: boolean;
  region?: string | string[] | undefined;
}

export default function Chart({
  item,
  className,
  case_size,
  name,
  bottle_size,
  vintage,
  isSpecial,
  region,
}: ChartProps) {
  const minimalConfig = {};
  const [selectedTab, setSelectedTab] = useState("yearly");

  const modifiedData = (
    selectedTab === "monthly" ? item.monthly : item.yearly
  ).map((entry) => ({
    ...entry,
    value: entry.value * case_size, // Adjust value
    performance: entry.performance, // Ensure performance is included
  }));

  const getOptimalStep = (range: number) => {
    const stepSizes = [
      5, 10, 25, 50, 100, 150, 200, 250, 500, 1000, 2000, 5000,
    ];
    return (
      stepSizes.find((step) => range % step === 0 || range / step <= 6) || 1000
    );
  };

  const minValue = Math.min(...modifiedData.map((item) => item.value ?? 0));
  const maxValue = Math.max(...modifiedData.map((item) => item.value ?? 0));
  const range = maxValue - minValue;

  const increment = getOptimalStep(range);

  // Ensure domain is perfectly aligned with the increment
  const domainMinValue = Math.floor(minValue / increment) * increment;
  const domainMaxValue = Math.ceil(maxValue / increment) * increment;

  // Add one extra step
  const totalSteps = Math.ceil((domainMaxValue - domainMinValue) / increment);
  const adjustedMaxValue = domainMinValue + (totalSteps + 1) * increment; // Added extra step

  return (
    <div className="w-full h-auto relative">
      {/* Select for choosing tab (Monthly/Yearly) */}
      <div className="w-full flex justify-between">
        <div className="ml-5">
          <p className="p-2  text-[16px] font-semibold">
            {name} {vintage}{" "}
            {isSpecial
              ? `1x${
                  case_size === 2
                    ? "150cl"
                    : case_size === 4
                    ? "300cl"
                    : "600cl"
                }`
              : `${case_size}x${bottle_size === "0750" ? "75cl" : ""}`}
          </p>
        </div>
        <Select value={selectedTab} onValueChange={(e) => setSelectedTab(e)}>
          <SelectTrigger className="p-0 h-7 rounded-xl w-auto px-2 m-2 absolute right-0">
            <SelectValue></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"monthly"}>Monthly</SelectItem>
            <SelectItem value={"yearly"}>Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="px-2 mt-4 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={minimalConfig}
          className={clsx("aspect-auto h-[15vw] w-full chart", className)} // Merging className
        >
          <AreaChart data={modifiedData}>
            <defs>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="10%"
                  stopColor={region === "Burgundy" ? "#FF5733" : "#7351C2"}
                  stopOpacity={0.8}
                />
                <stop
                  offset="50%"
                  stopColor={region === "Burgundy" ? "#FF5733" : "#7351C2"}
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />

            {/* YAxis with the min and max range based on the values */}
            <YAxis
              domain={[domainMinValue, adjustedMaxValue]}
              tickCount={totalSteps + 2} // +2 to account for extra step
              fontSize={9}
              tickMargin={5}
              tickFormatter={(value) => value.toLocaleString()}
              allowDataOverflow={true}
              label={{
                angle: -90,
                style: { textAnchor: "middle" },
              }}
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={5}
              minTickGap={1}
              tickFormatter={(value) => {
                const date = new Date(value);
                return selectedTab === "monthly"
                  ? date.toLocaleDateString("en-US", {
                      month: "short",
                    })
                  : date.getFullYear().toString();
              }}
            />

            <ChartTooltip
              cursor={false}
              content={({ label, payload }) => {
                if (!payload || !payload.length) return null; // Ensure payload exists

                const dataPoint = payload[0]?.payload; // Get full data object
                const originalValue = Number(
                  dataPoint?.value || 0
                ).toLocaleString();
                const performance = dataPoint?.performance
                  ? `${dataPoint.performance}`.match(/\d/) // Check if it contains a number
                    ? Number(dataPoint.performance).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }) // Format as `350.00`
                    : dataPoint.performance // Keep original format (e.g., "n05 350")
                  : "N/A"; // Handle missing performance

                return (
                  <div className="bg-white rounded-sm p-2 shadow shadow-[#0000002d]">
                    <strong>Date:</strong> {label}
                    <br />
                    <strong>Value:</strong> £{originalValue}
                    <br />
                    <p>
                      <strong>Performance:</strong>{" "}
                      <span
                        className={
                          Number(performance) < 0
                            ? "text-red-500"
                            : "text-green-500"
                        }
                      >
                        {performance}%
                      </span>
                    </p>
                  </div>
                );
              }}
            />

            <Area
              dataKey="value"
              type="natural"
              fill="url(#fillMobile)"
              stroke={region === "Burgundy" ? "#FF5733" : "#7351C2"}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}
