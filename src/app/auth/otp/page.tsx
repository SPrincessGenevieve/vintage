"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "@/app/context/UserContext";
import Loading from "@/components/loading";

export default function ForgotMFA() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
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
    setLoading(true); // Set loading to false after the request completes

    if (email === "") {
      setLoading(false);
      setMessage(true);
      setMessageColor("red");
      setTextMessage("Please input your email.");

      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/auth/otp/reset-mfa-email/`, {
        email,
      });

      if (response.status === 200) {
        setUserDetails({ email });
        localStorage.setItem("userEmail", email);
        setMessage(true);
        setMessageColor("green");
        setTextMessage("We have sent you a link. Please check your email.");
      }
    } catch (error) {
      setMessage(true);
      setMessageColor("red");
      setTextMessage("Failed to send email. Please try again.");
      console.error("Login error:", error);
      setLoading(false);
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
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
          <div className="mfa-cont w-[70%] h-auto flex gap-2 flex-col justify-center">
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
