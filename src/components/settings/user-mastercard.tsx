import Image from "next/image";
import { Button } from "../ui/button";
import MasterCard from "@/images/mastercard.png";
import { CircleAlert } from "lucide-react";
import { useUserContext } from "@/app/context/UserContext";
import { PaymentIcon } from "react-svg-credit-card-payment-icons";
import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface DefaultOption {
  defaultButton: boolean;
}

export default function UserMasterCard({
  defaultButton = true,
}: DefaultOption) {
  const { pay_method, sessionkey, setUserDetails } = useUserContext();

  const data = pay_method?.[0] || {};

  useEffect(() => {
    const fetchData = async () => {
      const authHeader = "Token " + sessionkey;

      try {
        const response = await axios.get(`${apiUrl}/stripe/payment-method`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        });
        setUserDetails({
          pay_method: response.data,
        });
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };

    fetchData();
  }, [sessionkey, setUserDetails]);

  

  return (
    <div className="border rounded-lg px-5 md:px-10 py-2 md:py-5 mt-5 w-full">
      {defaultButton ? (
        <>
          <div className="flex justify-end">
            <Button size="sm" variant="ghost" className="text-sm text-blue-500">
              Edit
            </Button>
          </div>
          <div className="flex items-center gap-10">
            <div className="h-auto w-[120px]">
              <PaymentIcon
                type={
                  (data.brand as
                    | "Alipay"
                    | "Amex"
                    | "Code"
                    | "CodeFront"
                    | "Diners"
                    | "Discover"
                    | "Elo"
                    | "Generic"
                    | "Hiper"
                    | "Hipercard"
                    | "Jcb"
                    | "Maestro"
                    | "Mastercard"
                    | "Mir"
                    | "Paypal"
                    | "Unionpay"
                    | "Visa") || ""
                }
                format="flatRounded"
                width={100}
              />
            </div>

            <div className="flex flex-col text-left">
              <h1 className="text-lg font-light capitalize">
                {data.brand || ""}
              </h1>
              <span className="text-xs text-red-500">
                Expiry {data.exp_month || ""}/{data.exp_year || ""}
              </span>
              <span className="text-xs pt-5">
                Ending number: {data.last4 || ""}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-8">
            <CircleAlert
              strokeWidth={1.3}
              size={20}
              className="text-orange-600"
            />
            <span className="font-light text-sm">
              Note: Debit card are for direct debit of management fee , use
              deposit funds to add balance on your account
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="flex  justify-center items-center w-full h-screen max-h-[100px]">
            <p>Create Payment Method</p>
          </div>
        </>
      )}
    </div>
  );
}
