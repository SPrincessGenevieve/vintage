"use client";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState, useEffect } from "react";
import { useUserContext } from "@/app/context/UserContext";
import axios from "axios";
import SpinnerIcon from "@/images/Spinner";
import { AlertCircle } from "lucide-react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ContactForm() {
  const { sessionkey } = useUserContext();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmitMessage = async () => {
    setLoading(true);
    setTimeout(() => {
      setSuccess(true);
      location.reload();
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="flex flex-col gap-3">
        <Label
          htmlFor="message"
          className="justify-between text-[12px] font-normal"
        >
          Your inquiry
        </Label>
        <div className="flex gap-2 items-center">
          <AlertCircle color="orange" size={15}></AlertCircle>
          <p className="text-[12px]">
            Try our AI chatbot for instant answers before contacting support!
          </p>
        </div>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      {success && <p className="text-green-500">Sent successfully</p>}
      {error && (
        <p className="text-red-500">
          Something went wrong. Please try again later.
        </p>
      )}

      <Button onClick={handleSubmitMessage} className="text-[12px] w-full mt-4">
        {loading && (
          <div>
            <SpinnerIcon stroke_color="white"></SpinnerIcon>
          </div>
        )}
        Submit ticket
      </Button>
    </div>
  );
}
