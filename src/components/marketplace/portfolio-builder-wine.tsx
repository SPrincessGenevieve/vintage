import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  PortfolioBuilderType,
  useUserContext,
} from "@/app/context/UserContext";
import defaultImage from "@/images/wine.png";
import "@/app/globals.css";
import { Button } from "../ui/button";
import axios from "axios";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import SpinnerIcon from "@/images/Spinner";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface BuilderType {
  item: PortfolioBuilderType[];
}

interface CartType {
  lwin11: string;
  case_size: number;
  quantity: number;
  bottle_size: string;
}

export default function PortfolioBuilderWine({}) {
  const { portfolio_builder, sessionkey, setUserDetails } = useUserContext();
  const [cartItem, setCartItem] = useState<CartType[]>([]); // Multiple regions as an array
  const authHeader = `Token ${sessionkey}`;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const wine_count = portfolio_builder.wines.length;

  const handleCancel = () => {
    setUserDetails({
      portfolio_builder: {
        wines: [], // Reset wine to an empty array
        total_market_value: 0,
        final_allocation: 0,
        remaining_budget: 0,
      },
    });
  };

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/wine/bulk-cart-items`,
        cartItem,
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Data: ", response.data);

        const responseCartCount = await axios.get(
          `${apiUrl}/api/wine/cart-items/`,
          {
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
          }
        );

        // Set the cart count state with the number of items
        setUserDetails({
          cartCount: responseCartCount.data.length,
          portfolio_builder: {
            wines: [], // Reset wine to an empty array
            total_market_value: 0,
            final_allocation: 0,
            remaining_budget: 0,
          },
        });

        setOpen(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCartItem(
      portfolio_builder.wines.map((item) => ({
        lwin11: item.lwin11,
        case_size: item.case_size,
        quantity: item.quantity,
        bottle_size: item.bottle_size,
      }))
    );
  }, [portfolio_builder]);

  console.log("CART ITEMS: ", cartItem);

  return (
    <>
      {open && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogTitle>Added to Cart</DialogTitle>
            <p>Added all wines successfully</p>
          </DialogContent>
        </Dialog>
      )}
      {wine_count !== 0 && (
        <div className="py-2 w-full h-auto">
          <div className="w-full h-auto bg-[white] rounded-2xl flex gap-4 pb-4">
            <div className="h-[350px] p-2 w-[90px] bg-white overflow-x-auto flex gap-2 flex-grow border rounded-2xl custom-scrollbar">
              {portfolio_builder.wines.map((item, index) => (
                <div
                  key={index}
                  className="relative h-full w-[300px] border bg-white rounded-2xl flex-shrink-0 p-4 flex-col flex gap-2 justify-between"
                >
                  <div className="absolute top-0 left-0 bg-[#C4AD93] rounded-tl-2xl w-[100px] h-[30px]">
                    <p className="w-full h-full text-[10px] text-white text-center flex items-center justify-center">
                      Critic Score: {item.rp_score}
                    </p>
                  </div>
                  <div className=" w-full flex justify-center">
                    <Image
                      width={400}
                      height={400}
                      className="w-auto h-[150px]"
                      src={item.images[0] || defaultImage}
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold">{item.name}</p>
                    <div className="text-[10px] font-light text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span>Price: </span>
                        <span>£{item.market_value.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Region: </span>
                        <span>{item.fromm}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Case Size: </span>
                        <span>
                          {item.case_size || ""}x
                          {item.bottle_size === "0750"
                            ? "75cl"
                            : item.bottle_size === "1500"
                            ? "150cl"
                            : item.bottle_size === "3000"
                            ? "300cl"
                            : "600cl"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Vintage: </span>
                        <span>{item.vintage || ""}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex gap-2 ">
            <p className="w-auto min-w-[170px] text-[14px]">
              <b>Final Allocation</b>
            </p>
            <p className="text-[14px]">:</p>
            <p className="w-auto min-w-[100px] text-[14px]">{wine_count} wines selected</p>
            {/* <p>
              Total: £
              {Number(
                Number(portfolio_builder.total_market_value).toFixed(2)
              ).toLocaleString()}{" "}
            </p> */}
          </div>
          <div className="w-full flex gap-2">
            <p className="w-auto min-w-[170px] text-[14px]">
              <b>Total Amount Invested</b>
            </p>
            <p className="text-[14px]">:</p>
            <p className="w-auto min-w-[100px] text-[14px]">
              £
              {Number(
                Number(portfolio_builder.total_market_value).toFixed(2)
              ).toLocaleString()}
            </p>
          </div>
          <div className="w-full flex gap-2">
            <p className="w-auto min-w-[170px] text-[14px]">
              <b>Remaining Budget</b>
            </p>
            <p className="text-[14px]">:</p>
            <p className="w-auto min-w-[100px] text-[14px]">
              £
              {Number(
                Number(portfolio_builder.remaining_budget).toFixed(2)
              ).toLocaleString()}
            </p>
          </div>
          <div className="w-[300px] flex gap-2 flex-col pt-4">
            <div className="flex gap-2 w-full">
              <Button
                className="w-full rounded-3xl border border-gray-500"
                variant="ghost"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddToCart}
                className="bg-[#5856D6] rounded-3xl w-full"
              >
                {loading && (
                  <div>
                    <SpinnerIcon stroke_color="white"></SpinnerIcon>
                  </div>
                )}
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
