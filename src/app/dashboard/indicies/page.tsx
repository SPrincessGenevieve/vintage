"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import IndicesTableHeader from "@/components/indices/indices-table-header";
import withAuth from "@/app/withAuth";
import axios from "axios";
import { useUserContext } from "@/app/context/UserContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Type definition for the data
interface MonthData {
  name: string;
  value: number;
  year: string;
}

// Define the data structure for wine data
interface WineData {
  [key: string]: MonthData[]; // Map wine type to an array of MonthData
}

function Indicies() {
  const [data, setData] = useState<WineData>({});
  const [containerHeight, setContainerHeight] = useState(200); // Default height
  const { indicies, sessionkey, setUserDetails } = useUserContext();
  const [frequency, setFrequency] = useState("yearly");
  const authHeader = "Token " + sessionkey;

  useEffect(() => {
    const fetchData = async () => {
      if (!sessionkey) {
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/user/indicies`, {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        });
        setUserDetails({
          indicies: response.data,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [sessionkey]);

  useEffect(() => {
    const formattedData: WineData = {};

    // Loop through each index type and format data
    if (indicies && Array.isArray(indicies)) {
      indicies.forEach((wineType) => {
        const wineFormattedData: MonthData[] = [];

        if (frequency === "monthly") {
          wineType.chart_data.monthly.forEach((yearData: any) => {
            wineFormattedData.push({
              name: `${new Date(yearData.date).getMonth() + 1}/${new Date(
                yearData.date
              ).getFullYear()}`, // MM/YYYY format
              value: yearData.value,
              year: new Date(yearData.date).getFullYear().toString(),
            });
          });
        } else {
          wineType.chart_data.yearly.forEach((yearData: any) => {
            wineFormattedData.push({
              name: new Date(yearData.date).getFullYear().toString(), // Just the year
              value: yearData.value,
              year: new Date(yearData.date).getFullYear().toString(),
            });
          });
        }

        // Save formatted data for each index type
        formattedData[wineType.name] = wineFormattedData;
      });

      setData(formattedData);
    }
  }, [indicies, frequency]);

  // Custom tick formatter to only show the year, once per group of months
  const renderCustomXAxisTick = (tickProps: any) => {
    const { x, y, payload } = tickProps;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          transform="rotate(-45)"
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          fontSize={10}
        >
          {payload.value}
        </text>
      </g>
    );
  };

  useEffect(() => {
    // Set the height based on window height
    const updateHeight = () => {
      if (window.innerHeight <= 700) {
        setContainerHeight(90);
      } else {
        setContainerHeight(200);
      }
    };

    window.addEventListener("resize", updateHeight);
    updateHeight(); // Set initial height

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const allDataPoints = Object.values(data).flat(); // Flatten all wine type data into a single array

  const minValue = Math.min(
    ...allDataPoints.map((item: MonthData) => item.value ?? 0)
  );
  const maxValue = Math.max(
    ...allDataPoints.map((item: MonthData) => item.value ?? 0)
  );

  const range = maxValue - minValue;

  // Determine the best increment based on the data range
  let increment;
  if (range <= 500) {
    increment = 50;
  } else if (range <= 2000) {
    increment = 100;
  } else if (range <= 5000) {
    increment = 500;
  } else if (range <= 10000) {
    increment = 1000;
  } else {
    increment = 2000;
  }

  // Adjust the min and max values for the domain to align with whole increments
  const domainMinValue = Math.floor(minValue / increment) * increment;
  const domainMaxValue = Math.ceil(maxValue / increment) * increment;

  return (
    <div className="bg-[#F4F6F8] w-full h-full  main-cont">
      <div className="bg-[#F4F6F8] flex w-full h-full flex-grow overflow-y-auto p-2">
        <div className="bg-[#F4F6F8] flex flex-wrap w-full h-0">
          <div className="w-full h-auto py-5 flex flex-wrap gap-4 items-center justify-evenly">
            <div className="w-full flex justify-end p-2">
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue className="text-[14px]"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {Object.entries(data).map(([wineType, wineData], index) => (
              <div
                key={wineType}
                className=" indices-graph bg-white w-[500px] border relative h-auto  rounded-2xl"
              >
                <IndicesTableHeader index={index} item={indicies} />
                <ResponsiveContainer
                  className="border-none w-full "
                  height={containerHeight} // Use dynamic height here
                >
                  <LineChart
                    className="flex"
                    data={wineData}
                    margin={{ top: 20, right: 30, bottom: 10 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={true}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      tick={renderCustomXAxisTick}
                      interval={0}
                      tickMargin={1}
                      angle={-45}
                      textAnchor="end"
                      scale="point"
                    />
                    <YAxis
                      domain={[
                        domainMinValue, // Adjusted minimum value rounded down
                        domainMaxValue, // Adjusted maximum value rounded up
                      ]}
                      tickCount={Math.ceil(range / increment) + 1} // Ensure enough ticks for the range
                      fontSize={9}
                      tickMargin={5}
                      tickFormatter={(value) => value.toLocaleString()} // Format ticks with commas
                      allowDataOverflow={true}
                      label={{
                        angle: -90, // Rotate label to be vertical
                        style: { textAnchor: "middle" }, // Center the label
                      }}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#9880CC"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <p className="rounded-b-2xl border border-t-0 text-center text-[12px] py-2  bg-[#F6F3EF] w-full">
                  {wineType}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default withAuth(Indicies);
