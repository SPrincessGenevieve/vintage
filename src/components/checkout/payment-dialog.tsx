import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import CreditCard from "@/images/card.png";
import UserMasterCard from "../settings/user-mastercard";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useUserContext } from "@/app/context/UserContext";

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

      // Now update the context with the new payment details:
      const updatedPayMethod = {
        id: 1, // Keep or adjust the ID if needed
        brand: paymentMethod.card?.brand ?? "", // Fallback to empty string if undefined
        exp_month: paymentMethod.card?.exp_month?.toString() ?? "", // Fallback to empty string if undefined
        exp_year: paymentMethod.card?.exp_year?.toString() ?? "", // Fallback to empty string if undefined
        last4: paymentMethod.card?.last4 ?? "", // Fallback to empty string if undefined
        is_default: true, // Adjust this based on the actual requirement
        stripe_payment_method_id: paymentMethod.id, // Stripe's payment method ID
      };

      // Update the user context with the new payment method
      setUserDetails({
        pay_method: [updatedPayMethod], // Update pay_method as an array of PaymentMethodType objects
      });
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
      setTimeout(() =>{
        location.reload()
      }, 1000)
    }
  };

  useEffect(() => {
    if (!pay_method || pay_method.length === 0) {
      setEmpty(false);
    } else {
      setEmpty(true);
    }
  }, [pay_method]);

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
