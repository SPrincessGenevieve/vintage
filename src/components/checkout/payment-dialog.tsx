"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import MasterCard from "@/images/mastercard.png";
import { Button } from "../ui/button";
import Image from "next/image";
import CreditCard from "@/images/card.png";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import UserMasterCard from "../settings/user-mastercard";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useUserContext } from "@/app/context/UserContext";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function PaymentDialog() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [empty, setEmpty] = useState(true);
  const stripe = useStripe();
  const elements = useElements();
  const { pay_method, sessionkey, setUserDetails } = useUserContext();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const authHeader = "Token " + sessionkey;

    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded.");
      return;
    }

    setIsProcessing(true);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        console.error("CardElement not found");
        setIsProcessing(false);
        return;
      }

      const { error: stripeError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

      if (stripeError) {
        console.error("Error creating payment method:", stripeError.message);
        setIsProcessing(false);
        return;
      }

      if (!paymentMethod || !paymentMethod.id) {
        console.error("Invalid payment method or missing ID.");
        setIsProcessing(false);
        return;
      }

      console.log("Payment Method Created:", paymentMethod);

      try {
        const cardPostResponse = await axios.post(
          `${apiUrl}/stripe/payment-method`,
          {
            stripe_payment_method_id: paymentMethod.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authHeader,
            },
          }
        );

        if (cardPostResponse.status === 200) {
          console.log(
            "Payment method successfully sent to backend:",
            cardPostResponse.data
          );

          const cardGetResponse = await axios.get(
            `${apiUrl}/stripe/payment-method`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: authHeader,
              },
            }
          );

          console.log("PAYMENT RESPONSE: ", cardGetResponse.data);

          setUserDetails({
            pay_method: cardGetResponse.data,
          });
        } else {
          console.error(
            "Backend API failed to create payment method. Status:",
            cardPostResponse.status
          );
          console.error("Backend Response:", cardPostResponse.data); // Log backend response
        }
      } catch (postError: any) {
        console.error(
          "Error during POST request to backend:",
          postError.response?.data || postError.message
        );
      }
    } catch (error: any) {
      console.error("Error occurred during payment process:", error.message);
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        console.error("No response received from the server:", error.request);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (!pay_method) {
      setEmpty(false);
    } else {
      setEmpty(true);
    }
  });

  return (
    <Dialog>
      <DialogTrigger className="flex w-full h-auto">
        <UserMasterCard defaultButton={empty}></UserMasterCard>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="font-light">Payment Details</DialogTitle>
        <DialogHeader className="text-[12px] text-[#898A8B]">
          Card, Debit, Credit method for payment
        </DialogHeader>
        <div>
          <div className="w-full flex items-center justify-center">
            <Image
              className="w-full max-w-[300px]"
              src={CreditCard}
              alt={""}
            ></Image>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <CardElement className="p-3 rounded-3xl  mt-4 border-[1.5px]" />

            <Button className="w-full" type="submit" disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Save"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
