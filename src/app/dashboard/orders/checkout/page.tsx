"use client";
import PaymentDialog from "@/components/checkout/payment-dialog";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "@/app/globals.css";
import { Button } from "@/components/ui/button";
import { Check, Wallet } from "lucide-react";
import withAuth from "@/app/withAuth";
import axios from "axios";
import { useUserContext } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import SpinnerIcon from "@/images/Spinner";
import CheckoutCalculation from "@/components/checkout/checkout-calculation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function CheckOut() {
  const router = useRouter();

  const {
    balance,
    sessionkey,
    currentPageMarket,
    currentPageMarketRare,
    calculation_list,
    currentPagePortfoio,
    setUserDetails,
  } = useUserContext();
  const [loading, setLoading] = useState("hidden");

  const [btnCheckoutDisabled, setBtnCheckoutDisabled] = useState(false);

  const investments = calculation_list.map((wine) => {
    const parsedPrice = parseFloat(String(wine.price)) || 0;
    return parsedPrice;
  });

  // Sum all parsed prices
  const wine_total = investments.reduce((acc, price) => acc + price, 0);

  useEffect(() => {
    if (Number(wine_total) > Number(balance)) {
      setBtnCheckoutDisabled(true);
    } else {
      setBtnCheckoutDisabled(false);
    }
  }, [balance, wine_total]);

  console.log("SELECTED WINES: ", calculation_list);
  console.log(
    "REQUEST PHOTO: ",
    calculation_list.map((item) => item.request_photo)
  );

  const handleCheckout = async () => {
    setLoading(""); // Assuming true means loading is shown
    const authHeader = "Token " + sessionkey;

    // Collect the investments data from calculation_list
    const investments = calculation_list.map((wine) => {
      if (wine.basket === null) {
        if (wine.user_investment === true) {
          // Use the structure for user investment

          return {
            user_investment: true,
            investment_id: wine.investment_id,
            quantity: wine.quantity,
            case_size: wine.case_size,
            request_photo: wine.request_photo,
          };
        } else {
          // Use the structure for wine vintage
          return {
            wine_vintage: wine.wine_vintage,
            cart_id: wine.cart_id,
            quantity: wine.quantity,
            case_size: wine.case_size,
            request_photo: wine.request_photo || false,
          };
        }
      } else {
        // Use the structure for user investment
        return {
          basket_id: wine.basket.id,
          cart_id: wine.cart_id,
          quantity: wine.quantity,
          case_size: wine.case_size,
          request_photo: wine.request_photo || false,
        };
      }
    });

    // Final payload to send
    const payload = {
      investments: investments,
    };

    console.log("DATA TO BE PASSED: ", payload);

    try {
      const response = await axios.post(
        `${apiUrl}/api/wine/investment/`,
        payload,
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
        });
        const endpoint =
          currentPageMarket === 1
            ? `${apiUrl}/api/wine/vint-ex/`
            : `${apiUrl}/api/wine/vint-ex/?page=${currentPageMarket}`;

        const endpointRare =
          currentPageMarketRare === 1
            ? `${apiUrl}/api/wine/rare/`
            : `${apiUrl}/api/wine/rare/?page=${currentPageMarketRare}`;

        const endpointInvest =
          currentPagePortfoio === 1
            ? `${apiUrl}/api/wine/investment/`
            : `${apiUrl}/api/wine/investment/?page=${currentPagePortfoio}`;

        try {
          const responseMarketPlace = await axios.get(endpoint, {
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
          });

          const responseMarketPlaceInvest = await axios.get(endpointRare, {
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
          });

          const responseInvestment = await axios.get(endpointInvest, {
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
          });

          const portfolioData = responseInvestment.data.results;

          if (
            responseMarketPlace.status === 200 &&
            responseMarketPlaceInvest.status === 200 &&
            responseInvestment.status === 200
          ) {
            setUserDetails({
              wine_marketplace: responseMarketPlace.data.results,
            });
            setUserDetails({
              marketplace_invest: responseMarketPlaceInvest.data.results,
            });
            setUserDetails({
              portfolio: portfolioData,
              wine_parent: responseInvestment.data.results.wine_parent,
            });
            setLoading("hidden"); // Stop loading on success
            router.push("/dashboard/portfolio");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    } catch (error: any) {
      console.log("Unexpected error:", error.message);
    } finally {
      setLoading("hidden"); // Stop loading in all cases
    }
  };

  return (
    <div className=" w-full h-full absolute flex">
      <div className="w-full h-full flex  checkout-cont">
        <div className="w-full h-full flex flex-col p-4">
          <p className="text-[14px] py-4">Payment Method</p>
          <div className="w-full h-full">
            <PaymentDialog></PaymentDialog>
          </div>
        </div>

        <div className="w-full h-full flex flex-col border-l  p-4">
          <p className="text-[12px]">Cart Summary</p>

          <div className="w-full h-full max-h-[400px] overflow-y-auto scroll-container">
            {calculation_list.map((wine, index) => (
              <div key={index} className="flex w-full mt-7">
                <div className="w-[20%] flex items-center justify-center">
                  <Image
                    width={300}
                    height={300}
                    src={wine.image}
                    alt={wine.name}
                    className="w-auto h-[100px]"
                  />
                </div>
                <div className="w-[60%] flex flex-col justify-between">
                  <div>
                    <p className="text-[14px] font-medium">{wine.name}</p>
                    <p className={`text-[12px]`}>
                      {wine.bottle_size === "0750"
                        ? `${wine.case_size}x75cl`
                        : wine.bottle_size === "1500"
                        ? `${wine.case_size}x150cl`
                        : wine.bottle_size === "3000"
                        ? `${wine.case_size}x300cl`
                        : wine.bottle_size === "6000"
                        ? `${wine.case_size}x600cl`
                        : ""}
                    </p>
                    <p className="text-[12px]">Quantity: {wine.quantity}</p>
                    <p className="text-[12px]">
                      {wine.request_photo ? "Photo Request: £16.87" : " "}
                    </p>
                  </div>
                  <div>
                    <p className="text-[12px]">
                      £
                      {String(
                        Number(wine.price).toLocaleString("en-GB", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      )}
                    </p>
                  </div>
                </div>
                <div className="w-[20%] text-[14px] font-medium flex items-end">
                  Total: £
                  {/* {(wine.price + (wine.request_photo ? 16.28 : 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}
                  {/* {wine.total_price.toLocaleString()} */}
                  {String(
                    Number(wine.total_price).toLocaleString("en-GB", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* {is_old_user && item.label === "Monthly Fees" ? ( */}
          <div className="px-[7%] mt-[2%] border-y py-2 overflow-y-auto h-full max-h-[300px]">
            <CheckoutCalculation></CheckoutCalculation>
          </div>
          <div className="w-full flex items-center justify-center py-4">
            <Button
              disabled={btnCheckoutDisabled}
              onClick={handleCheckout}
              className="w-full max-w-[400px] rounded-full"
            >
              <div className={`${loading}`}>
                <SpinnerIcon stroke_color="white"></SpinnerIcon>
              </div>
              <Wallet></Wallet>Pay Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default withAuth(CheckOut);
