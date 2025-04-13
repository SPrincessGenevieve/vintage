"use client";
import "../../../../globals.css";
import withAuth from "@/app/withAuth";
import {
  useUserContext,
  WineDetailsBigBottleType,
} from "@/app/context/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingDot from "@/images/loaddot";
import SpecialVolumeChildHeader from "@/components/marketplace/special-volume-child-header";
import { LinkApi } from "@/lib/utils";
import MarketplaceWineCardSpecialVolume from "@/components/marketplace/marketplace-wine-card-special-volume";
import SpecialVolumeWineChart from "@/components/marketplace/special-volume-wine-chart-card";
import MarketHeader from "@/components/marketplace/market-header";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function WineDetailsSpecialVolume(props: { params: Promise<{ id: number }> }) {
  const { sessionkey, setUserDetails } = useUserContext();
  const [id, setId] = useState<number | null>(null);
  const [index, setIndex] = useState<number[]>([]);
  const [data, setData] = useState(null);
  const [dataAll, setDataAll] = useState<any>({});
  const [dataDetails, setDataDetails] = useState<any>({});
  const [bottle_listing, setBottleListing] = useState<string[]>([]);
  const [dataVintage, setDataVintage] = useState<WineDetailsBigBottleType[]>(
    []
  );
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

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id || !sessionkey) return;

      const authHeader = "Token " + sessionkey;
      setLoading(true); // Set loading state to true while fetching
      try {
        const response = await axios.get(
          `${LinkApi.href}/special-volumes/${id}`,
          {
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
          }
        );
        const userDataDetails = response.data;

        const userDataParent = userDataDetails.wine_details;
        const userDataVintage = userDataDetails.results;
        const dataLength = userDataVintage.length;

        const storeIndex = () => {
          const indices = userDataVintage.map((_: any, i: number) => i); // Explicitly typing _ as any and i as number
          setIndex(indices); // Store indices in state
        };

        setDataDetails(userDataDetails.results[0]);
        setDataParent(userDataParent);
        setDataVintage(userDataVintage);
        storeIndex();

        setUserDetails({
          special_volume_details: userDataVintage,
          special_volume_parent: userDataParent,
          // bottle_listing:
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
  }, [id, sessionkey]);

  useEffect(() => {
    setBottleListing(
      index
        .map((item) => dataVintage[item]?.bottle_size) // Extract the bottle sizes
        .sort((a, b) => {
          const getNumericValue = (size: any) => {
            // Convert bottle size string to numeric value
            const numeric = parseFloat(size);
            return size.includes("L") ? numeric * 1000 : numeric; // Convert 'L' to ml for comparison
          };
          return getNumericValue(a) - getNumericValue(b); // Sort in ascending order
        })
    );
  }, [index, dataVintage]);

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
      <MarketHeader name={dataParent.name}></MarketHeader>
      <div className="flex flex-col bg-[#FCFCFC] w-full h-full">
        <div className="px-2 py-2 w-full h-full">
          <MarketplaceWineCardSpecialVolume
            bottle={bottle_listing}
            item={dataDetails}
            parent={dataParent}
            vintageAll={dataVintage}
            vintage={dataVintage[0]}
            year={dataYear}
          />
        </div>
        <div className="px-2 pb-2 port-charts-cont w-full h-auto">
          <SpecialVolumeWineChart
            parent={dataParent}
            item={dataVintage[0]}
          ></SpecialVolumeWineChart>
        </div>
      </div>
    </div>
  );
}
export default withAuth(WineDetailsSpecialVolume);
