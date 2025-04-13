"use client";

import React, { useState, useEffect,  } from "react";
import QRCode from "react-qr-code";
import { useSearchParams } from "next/navigation";
import { useUserContext } from "@/app/context/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog";
import Loading from "../loading";
import { Button } from "../ui/button";

type ImageType = "selfie" | "id";

export default function SignupFormFour() {
  const searchParams = useSearchParams();

  const verification_url = searchParams.get("verification_url");
  const {
    setUserDetails,
    email,
    password1,
    sessionkey,
    otp_validated,
    kyc_verify,
    mfa,
  } = useUserContext();
  const [status, setStatus] = useState("");
  const router = useRouter(); // Initialize router for navigation
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [dialog, setDialog] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state added

  const handleGoBack = () => {
    router.back(); // This will navigate to the previous page
  };

  useEffect(() => {
    const fetchKYCStatus = async () => {
      try {
        const authHeader = "Token " + sessionkey;

        // Perform the GET request to fetch the KYC status
        const kycResponse = await axios.get(`${apiUrl}/auth/kyc/verify`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        });

        setStatus(kycResponse.data.status);

        // Check if status is approved
        if (kycResponse.data.status === "approved") {
          console.log("Status approved. Making POST request to sign-in...");
          setDialog(true);
          // Make the POST request for sign-in
          const signInResponse = await axios.post(`${apiUrl}/auth/sign-in/`, {
            email: email,
            password: password1,
          });

          // Log the response from the sign-in request
          // console.log("Sign-in response:", signInResponse.data);

          // Update localStorage with KYC status
          setUserDetails({
            kyc_verify: "approved",
            mfa: "true",
            otp_verify: "true",
            otp_validated: "true",
          });
          localStorage.setItem("kyc_status", "approved");
          localStorage.setItem("mfa", "true");
          localStorage.setItem("otp_verify", "true");
          localStorage.setItem("otp_validated", "true");

          // Redirect to the dashboard
          router.push("/dashboard");
        }
      } catch (error: any) {
        console.error(
          "Failed to fetch KYC status or sign-in:",
          error.response?.data || error.message
        );
      }
    };

    // Check KYC status every 3 seconds
    const intervalId = setInterval(fetchKYCStatus, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [sessionkey, router]);

  const handleNextClick = () => {
    if (status !== "approved") {
      alert("Please finish the verification process to proceed");
    } else {
      // Proceed to the next page
      // Add logic to navigate to the next page if needed
    }
  };


  return (
    <>
      {loading && (
        <div className="absolute w-full h-full top-0 left-0">
          <Loading visible={loading} />
        </div>
      )}

      <div className="flex flex-col gap-5">
        
        <Dialog defaultOpen={dialog}>
          <DialogContent className="rounded h-[30%] flex flex-col items-center justify-center">
            <ShieldCheck
              size={100}
              strokeWidth={1.5}
              color="#92D050"
            ></ShieldCheck>
            <p className="text-center">
              Veriff verification success. <br></br>Rerouting...<br></br> Please
              wait
            </p>
          </DialogContent>
        </Dialog>
        <div className="mt-4 flex justify-between">
          <Link
            onClick={handleGoBack}
            href=""
            className="flex bg-white border border-gray-400 text-black rounded-3xl p-2 w-[170px] items-center justify-center"
          >
            <ArrowLeft /> Previous
          </Link>
        </div>
      </div>
    </>
  );
}
