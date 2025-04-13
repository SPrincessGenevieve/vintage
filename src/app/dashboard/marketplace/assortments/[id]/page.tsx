"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import withAuth from "@/app/withAuth";
import Image from "next/image";
import {
  AssortmentDetails,
  useUserContext,
} from "@/app/context/UserContext";
import Link from "next/link";
import AssortmentChildHeader from "@/components/marketplace/assortment-child-header";
import MarketplaceWineCardAssortment from "@/components/marketplace/marketplace-wine-card-assortment";
import MarketHeader from "@/components/marketplace/market-header";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function WineAssortments() {
  const { id } = useParams();
  const { sessionkey, assortment_details, assortment_list, setUserDetails } =
    useUserContext();
  const [dataVintage, setDataVintage] = useState<AssortmentDetails[]>([]);
  const [dataYear, setDataYear] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id || !sessionkey) return;

      const authHeader = "Token " + sessionkey;
      setLoading(true); // Set loading state to true while fetching
      try {
        const response = await axios.get(
          `${apiUrl}/api/wine/assortment/${id}/`,
          {
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
          }
        );
        const userDataDetails = response.data;
        const userDataParent = response.data.basket_details;
        const userDataVintage = response.data.results;
        setDataVintage(userDataVintage);
        setUserDetails({
          assortment_details: userDataVintage,
          assortment_list: [userDataParent],
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

  console.log("DETAILS LIST: ", assortment_list);
  console.log("DATA CHILDREN: ", dataVintage);
  const bottle_size = assortment_details[0]?.basket_bottle_size || "";

  return (
    <div className="bg-[#FCFCFC] flex flex-col w-full h-full">
      <MarketHeader name={assortment_list[0]?.name || ""}></MarketHeader>
      <div id="main-div" className="flex flex-col bg-[#FCFCFC] w-full h-full ">
        <div id="parent-wines" className="px-2 py-2 w-full h-auto flex">
          <MarketplaceWineCardAssortment
            parent={assortment_list[0]}
            vintage={assortment_details}
          />
        </div>
        <div className="px-2 py-2 w-full h-auto">
          <div className="w-full h-auto bg-[white] p-2 rounded-2xl flex gap-4">
            <div className="#FCFCFC h-[350px] p-2 w-[90px] bg-white overflow-x-auto flex gap-2 flex-grow border rounded-2xl">
              {assortment_details.map((item) => (
                <Link
                  key={item.id}
                  href={`/dashboard/marketplace/${item.wine_vintage.wine}`}
                  className="relative h-full w-[300px] border bg-white rounded-2xl flex-shrink-0 p-4 flex-col flex gap-2 justify-between"
                >
                  <div className="absolute top-0 left-0 bg-[#C4AD93] rounded-tl-2xl w-[100px] h-[30px]">
                    <p className="w-full h-full text-[10px] text-white text-center flex items-center justify-center">
                      Critic Score: {item.wine_vintage.rp_score}
                    </p>
                  </div>
                  <div className=" w-full flex justify-center">
                    <Image
                      width={400}
                      height={400}
                      className="w-auto h-[150px]"
                      src={item.wine_images[0]}
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold">
                      {item.wine_vintage.name}
                    </p>
                    <div className="text-[10px] font-light text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span>Price: </span>
                        <span>
                          £{item.wine_vintage.market_value.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Bottle Size: </span>
                        <span>
                          {assortment_list[0]?.case_size || ""}x
                          {bottle_size === "0750"
                            ? "75cl"
                            : bottle_size === "1500"
                            ? "150cl"
                            : bottle_size === "3000"
                            ? "300cl"
                            : bottle_size === "6000"
                            ? "600cl"
                            : ""}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Vintage: </span>
                        <span>{item.wine_vintage.vintage || ""}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(WineAssortments);
