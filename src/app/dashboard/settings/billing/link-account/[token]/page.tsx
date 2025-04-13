"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router

export default function LinkAccount(props: {
  params: Promise<{ token: string }>;
}) {
  const [token, setToken] = useState("");
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    async function resolveParams() {
      const resolvedParams = await props.params;
      setToken(resolvedParams.token);
    }
    resolveParams();
  }, [props.params]);

  useEffect(() => {
    if (token) {
      const plaidScript = document.createElement("script");
      plaidScript.src =
        "https://cdn.plaid.com/link/v2/stable/link-initialize.js";
      plaidScript.async = true;
      document.body.appendChild(plaidScript);

      plaidScript.onload = () => {
        const handler = (window as any).Plaid.create({
          token, // Properly passing the token here
          onSuccess: (public_token: string, metadata: any) => {
            console.log("Public token is:", public_token);
            console.log("Metadata is:", metadata);
            router.push("/dashboard/settings/billing");
          },
          onExit: (err: any, metadata: any) => {
            console.log("onExit invoked:", err, metadata);
            // Redirect to /dashboard/settings/billing on exit
            router.push("/dashboard/settings/billing");
          },
          onEvent: (eventName: string, metadata: any) => {
            console.log("Event name is:", eventName, metadata);
          },
        });

        // Open the Plaid handler immediately after the script loads
        handler.open();
      };

      return () => {
        document.body.removeChild(plaidScript);
      };
    }
  }, [token, router]);

  return <div className="w-full h-full absolute bg-white"></div>;
}
