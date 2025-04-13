import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

interface SearchBarProps {
  onSearchChange: (searchTerm: string) => void; // Make sure this matches the usage in your component
  value: string;
  onClick: () => void
}

export default function SearchBar({ onSearchChange, value, onClick }: SearchBarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onSearchChange) {
      onSearchChange(e.target.value); // Pass the value instead of the event
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      <Input
        value={value}
        onChange={handleChange}
        type="search"
        placeholder="Search..."
        className="w-full min-w-[300px] h-8 rounded-full bg-background pl-8 text-[10px] search-input"
      />
      <Button onClick={onClick} className="h-auto rounded-full">
        <Search className=" w-4 search-icon rounded-full" />
      </Button>
    </div>
  );
}
