"use client";
import React, { useEffect, useState } from "react";
import MarketplaceWineCard from "@/components/marketplace/marketplace-wine-card";
import WineChart from "@/components/marketplace/wine-chart-card";
import MarketHeader from "@/components/marketplace/market-header";
import withAuth from "@/app/withAuth";
import {
  MarketplaceInvest,
  useUserContext,
  VintageWineType,
  WineParentType,
  WineType,
} from "@/app/context/UserContext";
import axios from "axios";
import SpinnerIcon from "@/images/Spinner";
import LoadingDot from "@/images/loaddot";
import { Progress } from "@/components/ui/progress";
import { LinkApi } from "@/lib/utils";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function Wine(props: { params: Promise<{ id: number }> }) {
  const { yearSelect, wine_parent, sessionkey, setUserDetails } =
    useUserContext();
  const [dataVintage, setDataVintage] = useState<VintageWineType[]>([]);
  const [dataParent, setDataParent] = useState<WineParentType | null>(null);
  const [id, setId] = useState<number | null>(null);
  const [wineDataInvestmentSales, setWineDataInvestmentSales] = useState<any>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const [vintageYear, setVintageYear] = useState<number[]>([]);
  const [vintageTotalPage, setVintageTotalPage] = useState<number | null>(null);
  const [vintageEndpoints, setVintageEndpoints] = useState<string[]>([]);
  const [progress, setProgress] = useState(0); // Track progress of loading
  const [vintageMessage, setVintageMessage] = useState(
    "Collecting vintage data..."
  ); // Track progress of loading
  const [loadingDot, setLoadingDot] = useState(""); // Track progress of loading
  useEffect(() => {
    async function resolveParams() {
      const resolvedParams = await props.params;
      setId(resolvedParams.id);
    }
    resolveParams();
  }, [props.params]);

  useEffect(() => {
    async function fetchData() {
      if (!id || !sessionkey) return;

      const authHeader = "Token " + sessionkey;
      setLoading(true); // Start loading

      try {
        // Fetch the first page to get the total number of pages and wine details
        const responseVintage = await axios.get(
          `${LinkApi.href}/vint-ex/${id}`,
          {
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
          }
        );

        const totalPages = responseVintage.data.total_pages;
        const wineDetails = responseVintage.data.wine_details;

        setVintageTotalPage(totalPages);
        setDataParent(wineDetails);

        // let allVintageResults: VintageWineType[] = [];
        const vintageData = responseVintage.data.results;
        setDataVintage(responseVintage.data.results || []);
        setVintageYear(vintageData?.map((item: any) => item.vintage) || []);
      } catch (error) {
        console.error("Error fetching wine data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    }

    fetchData();
  }, [id, sessionkey]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVintageMessage("No wine vintage");
      setLoadingDot("hidden");
    }, 3000); // 5 seconds

    // Clear the timeout if the data loads before 5 seconds
    if (dataVintage && Object.keys(dataVintage).length > 0) {
      clearTimeout(timer);
    }

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, [dataVintage]);

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="w-[100px] h-[100px]">
          <LoadingDot></LoadingDot>
        </div>
        <p>Loading data...</p>
      </div>
    );
  }

  if (!dataVintage || Object.keys(dataVintage).length === 0) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className={`w-[100px] h-[100px] ${loadingDot}`}>
          <LoadingDot></LoadingDot>
        </div>
        <p>{vintageMessage}</p>
      </div>
    );
  }

  const is_special = dataVintage.map((year) => ({
    vintage: year.vintage,
    is_special: year.is_very_special,
  }));

  return (
    <div className="bg-[#FCFCFC] flex flex-col w-full h-auto min-h-full">
      {/* Header */}
      <MarketHeader name={dataParent?.name || ""}></MarketHeader>
      <div className="flex flex-col bg-[#FCFCFC] w-full h-full">
        {/* Wine Card */}
        {dataParent && (
          <div className="px-2 py-2 w-full h-auto min-h-[400px] ">
            <MarketplaceWineCard
              wine_name={dataParent.name}
              parent={wineDataInvestmentSales}
              year={vintageYear}
              is_special={is_special}
              vintage={dataVintage[yearSelect] || dataVintage[0]}
              item={dataParent} // Only render if dataParent is not null
            />
          </div>
        )}
        {/* <div className="px-2 pb-2 port-charts-cont w-full h-auto">
          <WineChart
            parent={dataParent}
            item={dataVintage[yearSelect] || dataVintage[0]}
          />
        </div> */}
      </div>
    </div>
  );
}

export default withAuth(Wine);
