"use client";

import { AlertCircle, MapPinned } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { Circle } from "lucide-react";
import * as echarts from "echarts";
import PieCharts from "./pie-chart";
import { useUserContext } from "@/app/context/UserContext";

export default function TierThreeR() {
  const { assets_by_region } = useUserContext();
  const [color, setColor] = useState("");
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

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

  // Calculate the sum of all asset values
  const totalAssets = assets_by_region
    ? Object.values(assets_by_region).reduce((acc, value) => acc + value, 0)
    : 0; // Return 0 if assets_by_region is undefined or null

  useEffect(() => {
    // Initialize the chart when the component mounts
    if (chartContainerRef.current) {
      const chart = echarts.init(chartContainerRef.current);

      // Map assets_by_region object to chart data
      const chartData = Object.entries(assets_by_region).map(
        ([region, value], index) => ({
          value,
          name: region,
          itemStyle: {
            color: `hsl(${(index * 60) % 360}, 70%, 50%)`, // Generate dynamic color
          },
        })
      );

      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {d}%",
        },

        series: [
          {
            name: "Assets by Region",
            type: "pie",
            radius: ["50%", "70%"], // Ring chart
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "12",
                fontWeight: "bold",
              },
            },
            data: chartData,
          },
        ],
      };

      chart.setOption(option);

      // Resize chart when dimensions change
      window.addEventListener("resize", () => chart.resize());
    }

    // Cleanup chart instance on component unmount
    return () => {
      if (chartContainerRef.current) {
        echarts.dispose(chartContainerRef.current);
      }
    };
  }, [assets_by_region]); // Depend on assets_by_region to re-render chart when it changes

  return (
    <div className="flex-grow w-full h-[95%] bg-white rounded-xl flex flex-col">
      <div className="p-2 py-4 w-full flex justify-between">
        <div className="flex gap-2 items-center">
          <MapPinned color="#2E5257" size={15} />
          <p className="text-[12px]">Assets by Region</p>
        </div>
      </div>

      {/* Charts */}
      <div className="relative w-full h-full flex flex-grow flex-col p-0 m-0">
        <div className="w-full h-[40%] flex justify-center chart-dashboard">
          <PieCharts></PieCharts>
        </div>

        <div className="legend-cont absolute bottom-0 leading-3 grid grid-cols-3 gap-2 w-full h-auto min-h-[25%] p-4">
          {assets_by_region
            ? Object.entries(assets_by_region).map(([region, value], index) => {
                const percentage = ((value / totalAssets) * 100).toFixed(2); // Calculate percentage
                const color =
                  regionColors[region as keyof typeof regionColors] ||
                  "#808080"; // Use type assertion

                return (
                  <div className="flex items-center gap-2 p-0 m-0" key={index}>
                    <Circle
                      stroke="none"
                      fill={color} // Use the mapped color here
                      size={10}
                    />
                    <p className="text-[10px]">
                      {region} (
                      {Number(Number(percentage).toFixed(0)).toLocaleString()}%)
                    </p>
                  </div>
                );
              })
            : null}{" "}
          {/* Add a fallback when assets_by_region is not available */}
        </div>
      </div>
    </div>
  );
}
