"use client";

import { Line, LineChart } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import './../../app/globals.css'

const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 282 },
    { month: "March", desktop: 184 },
    { month: "April", desktop: 281 },
    { month: "May", desktop: 487 },
    { month: "June", desktop: 386 },
    { month: "July", desktop: 482 },
    { month: "August", desktop: 454 },
    { month: "September", desktop: 381 },
    { month: "October", desktop: 587 },
    { month: "November", desktop: 485 },
    { month: "December", desktop: 382 },
    { month: "January", desktop: 234 },
    { month: "February", desktop: 356 },
    { month: "March", desktop: 287 },
    { month: "April", desktop: 172 },
    { month: "May", desktop: 493 },
    { month: "June", desktop: 402 },
    { month: "July", desktop: 478 },
    { month: "August", desktop: 439 },
    { month: "September", desktop: 390 },
    { month: "October", desktop: 560 },
    { month: "November", desktop: 457 },
    { month: "December", desktop: 374 },
    { month: "January", desktop: 201 },
    { month: "February", desktop: 288 },
    { month: "March", desktop: 179 },
    { month: "April", desktop: 285 },
    { month: "May", desktop: 489 },
    { month: "June", desktop: 417 },
    { month: "July", desktop: 298 },
    { month: "August", desktop: 372 },
    { month: "September", desktop: 435 },
    { month: "October", desktop: 512 },
    { month: "November", desktop: 420 },
    { month: "December", desktop: 362 },
    { month: "January", desktop: 477 },
    { month: "February", desktop: 339 },
    { month: "March", desktop: 256 },
    { month: "April", desktop: 404 },
    { month: "May", desktop: 486 },
    { month: "June", desktop: 472 },
    { month: "July", desktop: 358 },
    { month: "August", desktop: 421 },
    { month: "September", desktop: 480 },
    { month: "October", desktop: 535 },
    { month: "November", desktop: 511 },
    { month: "December", desktop: 462 },
    { month: "January", desktop: 249 },
    { month: "February", desktop: 365 },
    { month: "March", desktop: 295 },
    { month: "April", desktop: 376 },
    { month: "May", desktop: 523 },
    { month: "June", desktop: 413 },
    { month: "July", desktop: 397 },
    { month: "August", desktop: 465 }
  ];
  

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  };
  
  interface PortfolioPerformanceProps {
    stroke: string;  // Define stroke as a string prop
  }
  
  export function PortfolioPerformance({ stroke }: PortfolioPerformanceProps) {
    
    return (
      <ChartContainer config={chartConfig}>
        <div>
          <LineChart className="chart-performance" width={200} height={30} data={chartData}>
            <Line
              dataKey="desktop"
              type="linear"
              stroke={stroke}  // Use the passed stroke prop here
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </div>
      </ChartContainer>
    );
  }