"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Star } from "lucide-react";

interface YearSelectProps {
  disabled?: boolean;
  vintageYear: { vintage: number }[]; // Array of { value, label } objects
  isSpecial: { vintage: number; is_special: boolean }[]; // Array of { value, label } objects
  selectedVintage: number | null; // The selected value
  setSelectedVintage: (value: number) => void; // Function to update the selected value
}

export default function YearSelection({
  disabled = false,
  vintageYear,
  selectedVintage,
  isSpecial,
  setSelectedVintage,
}: YearSelectProps) {

  
  return (
    <Select
      disabled={disabled}
      onValueChange={(value: string) => setSelectedVintage(Number(value))}
      value={String(selectedVintage)} // Ensure value is a string
    >
      <SelectTrigger
        className={`h-8 ${disabled ? "opacity-50" : ""}`}
        disabled={disabled}
      >
        <SelectValue className="text-center gen-text-sm">
          {selectedVintage}
        </SelectValue>
      </SelectTrigger>
      {!disabled && (
        <SelectContent>
          {isSpecial.map((item, index) => (
            <SelectItem
              className={`gen-text-sm ${item.is_special === true && "bg-[#104144] text-white"}`}
              key={index}
              value={String(item.vintage)}
            >
              <div className=" w-[70px]  flex justify-between items-center">
                <p>{item.vintage}</p>{" "}
                <p>{item.is_special === true && <Star size={15}></Star>}</p>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      )}
    </Select>
  );
}
