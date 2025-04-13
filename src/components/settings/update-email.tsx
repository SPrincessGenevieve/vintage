"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  CheckCircle,
  CircleAlert,
  Edit,
  MailCheck,
  MailIcon,
  MailWarning,
  Send,
  ShieldX,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import axios from "axios";
import { useUserContext } from "@/app/context/UserContext";
import Spinner from "@/images/spinner.svg";
import SpinnerIcon from "@/images/Spinner";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function UpdateEmail() {
  const { email, password1, sessionkey, first_name, setUserDetails } =
    useUserContext();
  const [loading, setLoading] = useState(false);
  const [isdisabled, setDisable] = useState(true);
  const [display, setDisplay] = useState("");
  const [success, setSuccess] = useState(false);
  const [defaultView, setDefaultView] = useState(true);

  // State for form data
  const [resetCode, setResetCode] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [message, setMessage] = useState(
    <div className="flex items-center">
      <div className="w-10">
        <Spinner />
      </div>
      <p className="text-[#385723]">Sending code to email</p>
    </div>
  );
  const [messageColor, setMessageColor] = useState("text-red-500"); // Ensure it's a valid Tailwind class

  const handleEmail = async () => {
    const authHeader = "Token " + sessionkey;
    try {
      await axios.post(
        `${apiUrl}/user/request-change-email`,
        {
          email: email, // Include the email in the body
          password: password1, // Include the password in the body
        },
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "multipart/form-data", // Set content-type to multipart/form-data for file upload
          },
        }
      );

      console.log("Verification code sent to your current email.");

      setMessage(
        <div className="flex gap-2">
          <Send color="#31C969" />{" "}
          <p>Verification code sent to your current email.</p>
        </div>
      );
      setMessageColor("text-green-500"); // Use valid Tailwind color class

      setDisable(false);
      setTimeout(() => {
        setDisplay("hidden");
      }, 3000);
    } catch (error: any) {
      console.error("Error: ", error.response || error.message);
    }
  };

  const handleEmailUpdate = async () => {
    setLoading(true);

    console.log(resetCode);

    if (!resetCode) {
      setMessage(
        <div className="flex gap-2">
          <CircleAlert color="red" />{" "}
          <p>
            <span className="font-semibold">Email Reset Code </span> field is
            empty
          </p>
        </div>
      );
      setMessageColor("text-red-500");
      setLoading(false);
      setDisable(false);
    }

    if (!newEmail) {
      setMessage(
        <div className="flex gap-2">
          <CircleAlert color="red" />{" "}
          <p>
            <span className="font-semibold">New Email</span> field is empty
          </p>
        </div>
      );
      setMessageColor("text-red-500");
      setLoading(false);
      setDisable(false);
    }

    const authHeader = "Token " + sessionkey;

    // Create FormData object to append form fields
    const formData = new FormData();
    formData.append("resetCode", resetCode);
    formData.append("newEmail", newEmail);

    try {
      const response = await axios.patch(
        `${apiUrl}/user/confirm-change-email`,
        {
          email_reset_code: resetCode,
          new_email: newEmail,
        },
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "multipart/form-data", // Keep this as multipart/form-data
          },
        }
      );

      console.log("Email updated successfully!");
      console.log(newEmail);
      setUserDetails({
        email: newEmail,
      });
      setDisable(true);
      setDefaultView(false);
      setSuccess(true);
      setTimeout(() => {
        location.reload()
      }, 5000);
    } catch (error: any) {
      console.log("Error saving data:", error.response || error.message);
      setDisplay("");
      setMessage(
        <div className="flex gap-2">
          <ShieldX color="red" /> <p>{error.response.data.error}</p>
        </div>
      );
      setMessageColor("text-red-500"); // Use valid Tailwind color class
    } finally {
      setLoading(false);
      setTimeout(() => {
        setDisplay("hidden");
        setSuccess(false);
      }, 5000);
    }
  };

  return (
    <>
      {defaultView && (
        <Dialog>
          <DialogTrigger>
            <Button
              onClick={handleEmail}
              className="p-0 m-0 h-auto absolute top-9 right-2"
              variant="ghost"
            >
              <Edit />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Update Email</DialogTitle>

            <div className={`${display}`}>
              <p className={messageColor}>{message}</p>{" "}
              {/* Apply dynamic class here */}
            </div>

            {/* Reset Code Input */}
            <Label>Email Reset Code</Label>
            <Input
              disabled={isdisabled}
              required
              className="h-10"
              type="number"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)} // Update state on input change
            />

            {/* New Email Input */}
            <Label>New Email</Label>
            <Input
              disabled={isdisabled}
              required
              className="h-10"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)} // Update state on input change
            />

            {/* Update Button */}
            <Button onClick={handleEmailUpdate}>
              {loading ? (
                <>
                  <SpinnerIcon strokeColor="white"></SpinnerIcon>
                </>
              ) : (
                <></>
              )}
              Reset Email
            </Button>
          </DialogContent>
        </Dialog>
      )}
      {success && (
        <Dialog open>
          <DialogContent>
            <div className="w-full flex gap-4 flex-col items-center justify-center">
              <div className="flex items-center justify-center border-[5px] border-[#2E5257] rounded-full w-[100px] h-[100px]">
                <MailIcon color="#2E5257" size={70}></MailIcon>
              </div>
              <div>
                <p className="text-center text-[18px]">
                  Email Successfully Changed
                </p>
                <p className="text-center text-[12px]">
                  We've sent you an email to confirm your updated email address.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
