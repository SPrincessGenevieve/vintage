"use client";
import { MockWines } from "@/lib/mock-data";
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

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function Wine(props: { params: Promise<{ id: number }> }) {
  const { sessionkey, select_case_size_investment, setUserDetails } =
    useUserContext();
  const [id, setId] = useState<number | null>(null);
  const [data, setData] = useState(null);
  const [dataAll, setDataAll] = useState<any>({});
  const [dataDetails, setDataDetails] = useState<any>({});
  const [dataVintage, setDataVintage] = useState<any>({});
  const [dataParent, setDataParent] = useState<any>({});
  const [dataYear, setDataYear] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Wait for props.params to resolve and set the id
  useEffect(() => {
    async function resolveParams() {
      const resolvedParams = await props.params;
      setId(resolvedParams.id);
    }
    resolveParams();
  }, [props.params]);

  

  // Fetch data once `id` is available
  useEffect(() => {
    const fetchUserData = async () => {
      if (!id || !sessionkey) return;

      const authHeader = "Token " + sessionkey;
      setLoading(true); // Set loading state to true while fetching
      try {
        const response = await axios.get(
          `${apiUrl}/api/wine/investment/${id}`,
          {
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
          }
        );
        const userDataDetails = response.data;
        const userDataParent = response.data.wine_parent;
        const userDataVintage = response.data.wine_vintage_details;
        const userDataYear = response.data.wine_vintage_details.vintage;

        setDataDetails(userDataDetails);
        setDataParent(userDataParent);
        setDataVintage(userDataVintage)
        setDataYear(userDataYear);
        setUserDetails({
          portfolio_subpage: userDataDetails.name,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching is done
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id, sessionkey]); // Only fetch data when `id` changes

  if (loading) {
    return (
      <div className="absolute w-full h-full flex flex-col items-center justify-center">
        <div className="w-[100px] h-[100px]">
          <LoadingDot></LoadingDot>
        </div>
        <p>Loading data...</p>
      </div>
    );
  }

  if (!dataDetails) {
    return <div>Wine data not found</div>;
  }

  return (
    <div className="bg-[#FCFCFC] flex flex-col w-full h-full">
      {/* Header */}
      <PortfolioChildHeader name={dataParent.name}></PortfolioChildHeader>
      <div className="flex flex-col bg-[#FCFCFC] w-full h-full">
        {/* Wine Card */}
        <div className="px-2 py-2 w-full h-full">
          <PortfolioWineCard
            item={dataDetails}
            parent={dataParent}
            vintage={dataVintage}
            year={dataYear}
          />
        </div>
        {/* Chart Card */}
        <div className="px-2 pb-2 port-charts-cont w-full h-auto">
          {/* <WineChart item={item} /> */}
          <PortfolioInvestmentWineChart item={dataDetails}></PortfolioInvestmentWineChart>
        </div>
      </div>
    </div>
  );
}
export default withAuth(Wine);
