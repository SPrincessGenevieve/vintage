"use client";

import React from "react";
import { useUserContext } from "@/app/context/UserContext";

export default function TierOne() {
  const { balance, current_market_value, profit_loss } = useUserContext(); // Get balance, current_market_value, and profit_loss from user context
  const tierData = [
    { name: "Account Balance", value: balance },
    { name: "Current Market Value", value: current_market_value },
    { name: "Profit / Loss", value: profit_loss },
  ];

  // Function to format numbers with commas and decimals when necessary
  const formatValue = (value: number | string | null, decimalPlaces: number) => {
    let numericValue;
  
    if (value === null || value === undefined || isNaN(Number(value))) {
      numericValue = 0; // Default to 0 if the value is null, undefined, or not a valid number
    } else if (typeof value === "string") {
      numericValue = parseFloat(value); // Parse the string as a float
    } else {
      numericValue = value; // Assume it's already a number
    }
  
    // Return value with the appropriate decimal places and comma separator
    return numericValue.toLocaleString(undefined, {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    });
  };
  

  return (
    <div className="p-2 w-full h-full">
      <div className="w-full h-full flex bg-white rounded-xl">
        {tierData.map((item) => {
          // If the item is Profit / Loss, format with 2 decimal places, otherwise use 0 decimal places
          const decimalPlaces = item.name === "Profit / Loss" ? 2 : 0;
          const formattedValue = formatValue(item.value, decimalPlaces);

          return (
            <div
              className={`w-full h-full flex flex-col items-center justify-center
              ${
                item.name === "Account Balance" || item.name === "Current Market Value"
                  ? "border-x-2 border-[#C4AD93]" // Default color for balance and market value
                  : "border-x-2 border-white" // Profit/Loss has different border
              }
              `}
              key={item.name} // Add a unique key for each element
            >
              <p
                className={`text-[14px] ${
                  item.name === "Profit / Loss"
                    ? parseFloat(String(item.value)) <= 0
                      ? "text-red-500" // Red color if profit_loss <= 0
                      : "text-green-500" // Green color if profit_loss > 0
                    : ""
                } `}
              >
                {item.name === "Profit / Loss"
                  ? `${formattedValue}%`
                  : `£${formattedValue}`}
              </p>
              <p className="text-[10px] text-gray-400">{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
