"use client";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import PortfolioWineCard from "@/components/portfolio/portfolio-wine-card";
import "./../../../globals.css";
import PortfolioWineChart from "@/components/portfolio/portfolio-wine-chart-card";
import WineChart from "@/components/marketplace/wine-chart-card";
import withAuth from "@/app/withAuth";
import { useUserContext } from "@/app/context/UserContext";
import PortfolioChildHeader from "@/components/portfolio/portfolio-child-header";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingDot from "@/images/loaddot";
import PortfolioInvestmentWineChart from "@/components/portfolio/portfolio-investment-wine-chart-card";
import { investment } from "@/lib/data/investment";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function Wine(props: { params: Promise<{ id: number }> }) {
  const { sessionkey, select_case_size_investment, setUserDetails } =
    useUserContext();
  const [id, setId] = useState<number | null>(null);
  const [data, setData] = useState(investment[id || 0]);
  const [dataParent, setDataParent] = useState(investment[id || 0].wine_parent)
  const vintage_years = investment.map((item, index) =>(
    item.wine_vintage_details?.vintage
  ))
  const [dataYear, setDataYear] = useState(investment[id || 0].wine_vintage_details?.vintage || null)
  console.log("VINTAGE YEARS: ", vintage_years)


  // Wait for props.params to resolve and set the id
  useEffect(() => {
    async function resolveParams() {
      const resolvedParams = await props.params;
      setId(resolvedParams.id);
    }
    resolveParams();
  }, [props.params]);

  return (
    <div className="bg-[#FCFCFC] flex flex-col w-full h-full">
      {/* Header */}
      <PortfolioChildHeader name={dataParent?.name || ""}></PortfolioChildHeader>
      <div className="flex flex-col bg-[#FCFCFC] w-full h-full">
        {/* Wine Card */}
        <div className="px-2 py-2 w-full h-full">
          <PortfolioWineCard
            item={data}
            year={dataYear}
          />
        </div>
        {/* Chart Card */}
        <div className="px-2 pb-2 port-charts-cont w-full h-auto">
          {/* <WineChart item={item} /> */}
          <PortfolioInvestmentWineChart
            item={data}
          ></PortfolioInvestmentWineChart>
        </div>
      </div>
    </div>
  );
}
export default withAuth(Wine);
