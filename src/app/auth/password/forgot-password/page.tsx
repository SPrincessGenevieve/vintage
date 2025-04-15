"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect } from "react";
import { useUserContext } from "@/app/context/UserContext";
import Loading from "@/components/loading";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter()
  const [loading, setLoading] = useState(false); // Loading state added
  const { setUserDetails } = useUserContext();
  const [email, setEmail] = useState("");
  const [messageColor, setMessageColor] = useState("green");
  const [message, setMessage] = useState(false);
  const [textMessage, setTextMessage] = useState(
    "We have sent you a link. Please check your email."
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setLoading(true); // Set loading to false after the request completes

    if (email === "") {
      setLoading(false);
      setMessage(true);
      setMessageColor("red");
      setTextMessage("Please input your email.");

      return;
    }

    setMessage(true);
    setMessageColor("green");
    setTextMessage("Please wait. Redirecting...");
    
    setTimeout(() => {
      router.push("/auth/password/forgot-password/reset")
      // setLoading(false);
    }, 3000);
  };

  return (
    <>
      {/* Show the Loading screen when loading is true */}
      {loading && (
        <div className="absolute w-full h-full top-0 left-0">
          <Loading visible={loading} />
        </div>
      )}
      <div className="mt-[30%] w-full flex flex-col items-center sign-in-cont">
        <form
          onSubmit={handleSubmit}
          className="w-full flex items-center justify-center"
        >
          <div className="mfa-cont w-[80%] h-auto flex gap-2 flex-col justify-center">
            <h1 className="font-light text-center text-[14px] mb-[10%]">
              Please input your email
            </h1>
            <Label>Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10"
              type="email"
            />
            <Button className="w-full" type="submit">
              Submit
            </Button>
            {message && (
              <p className={`text-[${messageColor}]`}>{textMessage}</p>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
