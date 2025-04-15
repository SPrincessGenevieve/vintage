"use client";

import SettingsHeader from "@/components/settings/settings-header";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useUserContext } from "@/app/context/UserContext";
import axios from "axios";
import { useEffect, useState } from "react";

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

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

  useEffect(() => {
    // Use a mock valid client secret in the correct format
    setClientSecret("pi_3NJxF6W2C1tS1XXXX_secret_123456abcdef"); // Mock value with correct format
  }, []);

  const options = clientSecret
    ? {
        clientSecret,
        appearance: {},
      }
    : undefined;

  return (
    <div className="relative h-full bg-white">
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <div className="p-4">{children}</div>
        </Elements>
      )}
    </div>
  );
}
