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
  case_size: number[] | undefined; // Array of { value, label } objects
  selectedCaseSize: number | null; // The selected value
  case_size_title: string;
  bottle_size: string;
  setSelectedCaseSize: (value: number) => void; // Function to update the selected value
}

export default function CaseSize({
  disabled = false,
  case_size,
  selectedCaseSize,
  case_size_title,
  bottle_size,
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
          {`${selectedCaseSize}x${case_size_title}`} {/* Display the selected value */}
        </SelectValue>
      </SelectTrigger>
      {!disabled && (
        <SelectContent>
          {case_size.map((item, index) => (
            <SelectItem
              className="gen-text-sm"
              key={index}
              value={String(item)} // Convert number to string for SelectItem value
            >
              {item}x{bottle_size}
            </SelectItem>
          ))}
        </SelectContent>
      )}
    </Select>
  );
}
