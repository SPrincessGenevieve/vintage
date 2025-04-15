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

export default function ResetPasswordPage() {
  const { setUserDetails, password1, password2 } = useUserContext();

  const router = useRouter();
  const pathname = usePathname(); // This will give you the full URL path
  const searchParams = useSearchParams(); // Use this if you need query parameters
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(password1);
  const [confirmPassword, setConfirmPassword] = useState(password2);
  const [messageColor, setMessageColor] = useState("text-[#00B050]");
  const [loading, setLoading] = useState(false); // Loading state added

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    setNewPassword(password1);
    setConfirmPassword(password2);
  }, [password1, password2]);

  // Extract uid and token from the pathname
  const pathParts = pathname.split("/");
  const uid = pathParts[pathParts.length - 2]; // Assuming the last two segments are uid and token
  const token = pathParts[pathParts.length - 1];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageColor("text-[red]");
      setLoading(false);
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }

    if (!newPassword) {
      setMessage("Please input new password.");
      setMessageColor("text-[red]");
      setLoading(false);
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }
    setLoading(false);
    if (!confirmPassword) {
      setMessage("Please input your password again.");
      setMessageColor("text-[red]");
      setLoading(false);
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }

    setMessage("Your password has been reset successfully. Redirecting...");
    setMessageColor("text-[#00B050]");
    setTimeout(() => {
      setMessage("");
      router.push("/auth/sign-in");
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
      <div className="w-full h-auto mt-[20%] flex justify-center">
        <form
          className="w-[80%] h-auto flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className={`py-4 `}>
            {message && <p className={`${messageColor}`}>{message}</p>}
          </div>

          <Label>New password</Label>
          <Input
            className="h-10"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Label>Confirm new password</Label>
          <Input
            className="h-10"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button className="">SUBMIT</Button>
        </form>
      </div>
    </>
  );
}
