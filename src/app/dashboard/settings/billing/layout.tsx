"use client";

import SettingsHeader from "@/components/settings/settings-header";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useUserContext } from "@/app/context/UserContext";
import axios from "axios";
import { useEffect, useState } from "react";

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!stripePublishableKey) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(stripePublishableKey);

export default function BillingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [switchElement, setSwitchElement] = useState(true);

  const { sessionkey } = useUserContext();

  useEffect(() => {
    async function fetchClientSecret() {
      const authHeader = "Token " + sessionkey;

      try {
        // Make a request to your backend to get the SetupIntent clientSecret using axios
        const response = await axios.post(
          `${apiUrl}/stripe/setup-intent`,
          {},
          {
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("DATA: ", response.data);
        console.log("CLIENT KEY: ", response.data.client_secret);

        if (response.data.payment_method) {
          // If payment_method is present
          setSwitchElement(false);
        } else if (response.data.client_secret) {
          // If client_secret is present
          setClientSecret(response.data.client_secret); // Assuming the API returns { clientSecret: '...' }
          setSwitchElement(true);
        } else {
          // If neither payment_method nor client_secret is present
          console.log("Neither Payment Method nor Client Secret found.");
        }
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    }

    fetchClientSecret();
  }, [sessionkey]);

  const options = clientSecret
    ? {
        clientSecret, // Only pass clientSecret if it's not null
        appearance: {
          /*...*/
        },
      }
    : undefined;

  return (
    <div className="relative h-full bg-white">
      {switchElement ? (
        <div>
          {clientSecret && (
            <Elements stripe={stripePromise} options={options}>
              <div className="p-4">{children}</div>
            </Elements>
          )}
        </div>
      ) : (
        <div>
          <Elements stripe={stripePromise}>
            <div className="p-4">{children}</div>
          </Elements>
        </div>
      )}
    </div>
  );
}



// NOTE: MAG ERROR NI SIYA PAG WALA PA ANG KYC!!!! NOT UR PROBLEM
// NOTE: MAG ERROR NI SIYA PAG WALA PA ANG KYC!!!! NOT UR PROBLEM
// NOTE: MAG ERROR NI SIYA PAG WALA PA ANG KYC!!!! NOT UR PROBLEM
// NOTE: MAG ERROR NI SIYA PAG WALA PA ANG KYC!!!! NOT UR PROBLEM
// NOTE: MAG ERROR NI SIYA PAG WALA PA ANG KYC!!!! NOT UR PROBLEM
// NOTE: MAG ERROR NI SIYA PAG WALA PA ANG KYC!!!! NOT UR PROBLEM
// NOTE: MAG ERROR NI SIYA PAG WALA PA ANG KYC!!!! NOT UR PROBLEM
// NOTE: MAG ERROR NI SIYA PAG WALA PA ANG KYC!!!! NOT UR PROBLEM
// NOTE: MAG ERROR NI SIYA PAG WALA PA ANG KYC!!!! NOT UR PROBLEM
// NOTE: MAG ERROR NI SIYA PAG WALA PA ANG KYC!!!! NOT UR PROBLEM