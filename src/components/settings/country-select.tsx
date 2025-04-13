"use client";
import React, { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Icon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { country_list } from "@/lib/country-data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Input } from "../ui/input";
import { useUserContext } from "@/app/context/UserContext";


interface CountryType {
  value: string;
  setValue: (value: string) => void;
  className: string;
}


export default function CountriesSelect({value, setValue, className} : CountryType) {
  const [open, setOpen] = React.useState(false);
  const { country, setUserDetails } = useUserContext();

  useEffect(
    () =>
      setUserDetails({
        country: value,
      }),
    [value]
  );
  

 
  const frameworks = country_list;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={className} asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between rounded-lg "
        >
          {/* Include the image before the text */}
          {value ? (
            <div className="flex gap-2 items-center">
              <Image
                src={
                  frameworks.find((framework) => framework.name === value)
                    ?.image || "default-image.png"
                }
                alt="Country flag"
                width={400}
                height={400}
                className="w-[25px] h-[25px]"
              />
              <p>{frameworks.find((framework) => framework.name === value)?.name}</p>
            </div>
          ) : (
            "Select country..."
          )}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.name}
                  value={framework.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Image
                    src={framework.image}
                    alt={""}
                    width={400}
                    height={400}
                    className="w-[30px] h-[30px]"
                  ></Image>{" "}
                  {framework.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
