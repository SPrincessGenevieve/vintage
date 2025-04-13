import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Define the type for props
interface CaseSizeProps {
  disabled?: boolean;
  case_size: { label: string; value: string; id: number }[]; // Array of { value, label } objects
  selectedCaseSize: number | null; // The selected value
  case_size_title: string;
  case_size_value: string;
  setSelectedCaseSize: (value: number) => void; // Function to update the selected value
}

export default function CaseSizeSpecialVolume({
  disabled = false,
  case_size,
  selectedCaseSize,
  case_size_title,
  case_size_value,
  setSelectedCaseSize,
}: CaseSizeProps) {
  // Manage the selected case size value with state
  const [selectedCase, setSelectedCase] = useState<number>(1);

  return (
    <Select
      defaultValue="1" // Default value as a string
      disabled={disabled}
      onValueChange={(value: string) => setSelectedCaseSize(Number(value))}
      value={String(selectedCaseSize)} // Convert the number to a string for the Select component
    >
      <SelectTrigger
        className={`h-8 ${disabled ? "opacity-50" : ""}`}
        disabled={disabled}
      >
        <SelectValue className="text-center gen-text-sm">
          {`${case_size_value}x${case_size_title}cl `}{" "}
          {/* Display the selected value */}
        </SelectValue>
      </SelectTrigger>
      {!disabled && (
        <SelectContent>
          {case_size.map((item, index) => (
            <SelectItem
              className="gen-text-sm"
              key={index}
              value={String(item.id)} // Convert number to string for SelectItem value
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      )}
    </Select>
  );
}
