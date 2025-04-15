"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart, Legend } from "recharts";
import { useUserContext } from "@/app/context/UserContext";
import { UserData } from "@/lib/data/user";

// Default chartConfig
const chartConfig = {} satisfies ChartConfig;

export default function PieCharts() {
  const assets_by_region = UserData.assets_by_region
  const [innerRadius, setInnerRadius] = useState(65);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight <= 780) {
        setInnerRadius(45);
      } else {
        setInnerRadius(65);
      }
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const regionColors: { [key: string]: string } = {
    Bordeaux: "#104144",
    Burgundy: "#80020e",
    Champagne: "#C4AD93",
    Rhone: "#F7C143",
    Italy: "#1BCD32",
    France: "#000091",
    Cortia: "#000",
    "Rest of the World": "#8D1B22",
  };

  // Use the same dynamic HSL color logic for both the PieChart and legend
  const chartData = assets_by_region
    ? Object.entries(assets_by_region).map(([region, value]) => ({
        name: region,
        visitors: value,
        fill: regionColors[region] || "#808080", // Get color from regionColors, default to grey if not found
      }))
    : []; // Provide an empty array if assets_by_region is undefined

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || payload.length === 0) return null;

    return (
      <div className="p-2 bg-white text-black rounded-md shadow-lg">
        <p className="font-semibold">{payload[0].name}</p>
        <p>£{`${Number(payload[0].value.toFixed(0)).toLocaleString()}`}</p>
      </div>
    );
  };

  return (
    <Card className="flex border-none shadow-none w-auto h-[70%] card-cont bg-transparent absolute">
      <CardContent className="flex w-full h-full">
        <ChartContainer config={chartConfig}>
          <PieChart>
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="name"
              innerRadius={innerRadius}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
