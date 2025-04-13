"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import withAuth from "@/app/withAuth";
import Image from "next/image";
import {
  PortfolioType,
  SpecialBundlesList,
  useUserContext,
} from "@/app/context/UserContext";
import PortfolioSpecialBundleChildHeader from "@/components/portfolio/portfolio-special-bundle-child-header";
import MarketplaceWineCardSpecialBundles from "@/components/marketplace/marketplace-wine-card-special-bundles";
import Link from "next/link";
import PortfolioWineCardSpecialBundles from "@/components/portfolio/portfolio-wine-card-special-bundles";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function WinePortfolio(props: { params: Promise<{ basket_id: number }> }) {
  const { sessionkey, portfolio_basket_detail, setUserDetails } =
    useUserContext();
  const [id, setId] = useState<number | null>(null);

  // Wait for props.params to resolve and set the id
  useEffect(() => {
    async function resolveParams() {
      const resolvedParams = await props.params;
      setId(resolvedParams.basket_id);
    }
    resolveParams();
  }, [props.params]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id || !sessionkey) return;

      const authHeader = "Token " + sessionkey;
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
        const basketParent = response.data;
        const basket_details = response.data.basket_details;

        setUserDetails({
          portfolio_basket_detail: {
            id: basketParent.id,
            investment: basketParent.investment,
            wine_vintage: basketParent.wine_vintage,
            quantity: basketParent.quantity,
            case_size: basketParent.case_size,
            market_value: basketParent.market_value,
            profit_lost: basketParent.profit_lost,
            profit_lost_by_percent: basketParent.profit_lost_by_percent,
            investment_status: basketParent.investment_status,
            quantity_to_sell: basketParent.quantity_to_sell,
            quantity_to_transfer: basketParent.quantity_to_transfer,
            sub_account: basketParent.sub_account,
            created_at: basketParent.created_at,
            basket_details: {
              id: basket_details.id,
              name: basket_details.name,
              image: basket_details.image,
              winery: basket_details.winery,
              region: basket_details.region,
              special_id: basket_details.special_id,
              is_assortment: basket_details.is_assortment,
            },
            basket_items: basketParent.basket_items,
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id, sessionkey]); // Only fetch data when `id` changes

  const bottle_size =
    portfolio_basket_detail.basket_items[0]?.basket_bottle_size || "";

  return (
    <div className="bg-[#FCFCFC] flex flex-col w-full h-full">
      <PortfolioSpecialBundleChildHeader
        name={portfolio_basket_detail.basket_details.name || ""}
      />
      <div id="main-div" className="flex flex-col bg-[#FCFCFC] w-full h-full ">
        <div id="parent-wines" className="px-2 py-2 w-full h-auto flex">
          <PortfolioWineCardSpecialBundles item={portfolio_basket_detail} />
        </div>
        <div className="px-2 py-2 w-full h-auto">
          <div className="w-full h-auto bg-[white] p-2 rounded-2xl flex gap-4">
            <div className="#FCFCFC h-[350px] p-2 w-[90px] bg-white overflow-x-auto flex gap-2 flex-grow border rounded-2xl">
              {portfolio_basket_detail.basket_items.map((item) => (
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
                          {portfolio_basket_detail.case_size || ""}x
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

export default withAuth(WinePortfolio);
