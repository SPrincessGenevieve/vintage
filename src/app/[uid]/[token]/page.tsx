"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // We use this for accessing the dynamic route params
import { useUserContext } from "@/app/context/UserContext";
import { usePathname, useSearchParams } from "next/navigation"; // Importing necessary hooks
import Loading from "@/components/loading";
import AuthGridImages from "@/components/auth/auth-grid-images";
import SpinnerIcon from "@/images/Spinner";
import AuthHeader from "@/components/auth/auth-header";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ResetMFAPage() {
  const router = useRouter();
  const pathname = usePathname(); // This will give you the full URL path
  const [message, setMessage] = useState("");
  const [tokenKey, setTokenkey] = useState("");
  const [messageColor, setMessageColor] = useState("green");
  const [loading, setLoading] = useState(false); // Loading state added

  // Extract uid and token from the pathname
  const pathParts = pathname.split("/");
  const uid = pathParts[pathParts.length - 2]; // Assuming the last two segments are uid and token
  const token = pathParts[pathParts.length - 1];

  // Ensure that uid and token are captured
  useEffect(() => {
    if (!uid || !token) {
      setMessage("Invalid or missing link.");
      setMessageColor("red");
    }
  }, [uid, token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!tokenKey) {
      setMessage("Token is invalid.");
      setMessageColor("red");
      setLoading(false);
      return;
    }

    if (!uid || !token) {
      setMessage("Invalid or missing token.");
      setMessageColor("red");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/auth/otp/reset-mfa-email/${uid}/${token}/`,
        {
          verification_code: tokenKey,
        }
      );

      console.log("RESPONSE: ", response);
      console.log("DATA: ", response.data);
      setMessage("MFA has been disabled.");
      setMessageColor("#00B050");
      router.push("/auth/sign-in");
    } catch (error) {
      setMessage("Invalid/expired token. Please try again.");
      setMessageColor("red");
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };
  return (
    <div className="h-full w-full grid grid-cols-1 md:grid-cols-2">
      <div className="h-full">
        <AuthGridImages />
      </div>

      <div className="flex flex-col h-full items-center mt-[15%]">
        <AuthHeader></AuthHeader>
        <form
          className="w-[80%] h-auto flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className="py-4 text-[#16523e]">
            {message && <p className={`text-${messageColor}`}>{message}</p>}
          </div>
          <Label>Input six digit code</Label>
          <Input
            className="h-10 text-center"
            type="text"
            value={tokenKey}
            onChange={(e) => setTokenkey(e.target.value)}
          />

          <Button className="">
            {loading && (
              <div className="absolute w-full h-full top-0 left-0">
                <SpinnerIcon stroke_color="white"></SpinnerIcon>
              </div>
            )}
            SUBMIT
          </Button>
        </form>
      </div>
    </div>
  );
}
