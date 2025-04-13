import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import { useEffect, useState } from "react";
import PortfolioBuilderWine from "./portfolio-builder-wine";
import axios from "axios";
import { useUserContext } from "@/app/context/UserContext";
import { Button } from "../ui/button";
import SpinnerIcon from "@/images/Spinner";
import { useRouter } from "next/navigation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function PortfolioBuilderForm() {
  const router = useRouter();

  // Regions including "All"
  const regionData: string[] = [
    "Bordeaux",
    "Burgundy",
    "Champagne",
    "Italy",
    "California",
  ];

  const [budget, setBudget] = useState("1000");
  const [years, setYears] = useState("5");
  const [regions, setRegions] = useState<string[]>([]);
  const { sessionkey, portfolio_builder, setUserDetails } = useUserContext(); // Destructured context for cleaner code
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const [budgetLabel, setBudgetLabel] = useState("");
  const [yearLabel, setYearLabel] = useState("");
  const [regionLabel, setRegionLabel] = useState("");
  const [budgetMessage, setBudgetMessage] = useState(
    "Your investment needs to be at least £1,000 and not be more than £250,000."
  );
  const [durationMessage, setDurationMessage] = useState(
    "This investment requiResult a minimum 5-year and maximum of 50-year term commitment period."
  );
  const [budgetHover, setBudgetHover] = useState(false);
  const [yearHover, setYearHover] = useState(false);

  const authHeader = `Token ${sessionkey}`;

  const params = {
    budget: Number(budget),
    years: Number(years),
    regions:
      regions.length === 0
        ? ["Bordeaux", "Burgundy", "Champagne", "Italy", "California"]
        : regions.filter((region) => region !== "All"),
  };
  console.log("DATA: ", params);

  const handleGenerate = async () => {
    setLoading(true);
    if (Number(years) < 5 || Number(years) > 50) {
      setYearLabel("text-[red]");
      setYearHover(true);
      setTimeout(() => {
        setYearHover(false);
        setDurationMessage(
          "This investment requires a minimum 5-year and maximum of 50-year term commitment period."
        );
        setYearLabel("");
      }, 3000);
      setLoading(false);
      return;
    }

    if (Number(budget) < 1000 || Number(budget) > 250000) {
      setBudgetLabel("text-[red]");
      setBudgetHover(true);
      setBudgetMessage(
        "Your investment needs to be at least £1,000 and not be more than £250,000."
      );
      setTimeout(() => {
        setBudgetHover(false);
        setBudgetLabel("");
      }, 3000);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/api/wine/portfolio-builder/`,
        params,
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        }
      );

      setUserDetails({
        portfolio_builder: response.data,
      });
      setCount(response.data.length);

      console.log(response.data); // Log response data
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle region selection (add/remove region from the array)
  const handleRegionToggle = (region: string) => {
    if (region === "All") {
      if (regions.includes("All")) {
        setRegions([]); // Uncheck "All" and deselect all regions
      } else {
        setRegions(regionData.filter((r) => r !== "All")); // Select all regions EXCEPT "All"
      }
    } else {
      // Regular region handling
      setRegions(
        (prevRegions) =>
          prevRegions.includes(region)
            ? prevRegions.filter((r) => r !== region) // Uncheck region
            : [...prevRegions, region] // Check region
      );
    }
  };

  const handleCancel = () => {
    setBudget("1000");
    setYears("5");
    setRegions([]);
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");

    // Allow only numbers and at most one decimal point
    if (!/^\d*\.?\d*$/.test(rawValue)) return;

    setBudget(rawValue);
  };

  const formatNumber = (value: string) => {
    if (!value) return "";

    const [integerPart, decimalPart] = value.split(".");
    const formattedInteger = Number(integerPart).toLocaleString();

    return decimalPart !== undefined
      ? `${formattedInteger}.${decimalPart}`
      : formattedInteger;
  };

  const handleYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (Number(value) > 50) return;
    setYears(value);
  };

  return (
    <div className="w-full h-full flex flex-col gap-8 mt-[2%]">
      <div className="w-full h-auto gap-4 flex flex-col">
        <div className="grid grid-cols-2 gap-4 w-full max-w-[120vh]">
          <HoverCard open={budgetHover}>
            <HoverCardTrigger>
              <div>
                <Label className={`${budgetLabel}`}>
                  How much do you want to invest? (₤)
                </Label>
                <Input
                  value={formatNumber(budget)}
                  onChange={handleBudgetChange}
                  className="h-10 rounded-3xl"
                  type="text" // Still use text to allow commas/decimal
                  inputMode="decimal"
                  min="1000"
                  max="250000"
                />
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              <p className="text-[12px] text-[red] font-semibold">
                {budgetMessage}
              </p>
            </HoverCardContent>
          </HoverCard>
          <HoverCard open={yearHover}>
            <HoverCardTrigger>
              <div>
                <Label className={`${yearLabel}`}>
                  How long do you want to invest? (years)
                </Label>
                <div className="relative  flex items-center">
                  <Input
                    value={years}
                    onChange={handleYearsChange}
                    className="h-10 rounded-3xl"
                    type="number"
                    min={0}
                    max={50}
                  />
                </div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              <p className="text-[12px] text-[red] font-semibold">
                {durationMessage}
              </p>
            </HoverCardContent>
          </HoverCard>
          <div>
            <Label className={`${regionLabel}`}>
              Which regions you want to invest?
            </Label>
            <Menubar className="p-0">
              <MenubarMenu>
                <MenubarTrigger className="p-0 m-0 h-10 w-full">
                  <Input
                    className=" rounded-3xl"
                    value={regions.length > 0 ? regions.join(", ") : "All"}
                    readOnly
                  />
                </MenubarTrigger>
                <MenubarContent>
                  {regions.length > 0 && (
                    <MenubarItem
                      onClick={() => setRegions([])}
                      className="text-red-600 font-semibold"
                    >
                      Clear Filter
                    </MenubarItem>
                  )}
                  {regionData.map((region) => (
                    <MenubarCheckboxItem
                      key={region}
                      checked={regions.includes(region)}
                      onCheckedChange={() => handleRegionToggle(region)}
                    >
                      {region}
                    </MenubarCheckboxItem>
                  ))}
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
        <div className="w-[300px] flex flex-row gap-2">
          <Button
            onClick={handleCancel}
            className="w-full rounded-3xl border border-gray-500"
            variant="ghost"
          >
            Cancel
          </Button>
          <Button
            onClick={handleGenerate}
            className="w-full rounded-3xl bg-[#5856D6]"
          >
            {loading && (
              <div>
                <SpinnerIcon strokeColor="white"></SpinnerIcon>
              </div>
            )}
            Generate
          </Button>
        </div>
      </div>
      <div className="h-[50%] flex">
        <PortfolioBuilderWine />
      </div>
    </div>
  );
}
