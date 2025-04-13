"use client";

import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  ArrowLeft,
  Calendar1,
  MessageCircle,
  MessageCircleQuestion,
} from "lucide-react";
import "./../../app/globals.css";
import BookCalendar from "./book-calendar";
import BookedSuccess from "./booked-success";
import { useUserContext } from "@/app/context/UserContext";
import axios from "axios";
import BookedFailed from "./booked-failed";
import { NewBooking } from "./new-booking";
import BookParticipants from "./book-participants";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function BookingForm() {
  const { event_list, sessionkey } = useUserContext();
  const [eventSelect, setEventSelect] = useState("");
  const [dateSelect, setDateSelect] = useState("");
  const [open, setOpen] = useState(false);
  const [openFalse, setOpenFalse] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [dialogMessage, setDialogMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newBooking, setNewBooking] = useState(false);
  const [participants, setParticipants] = useState("");
  const authHeader = "Token " + sessionkey;
  const pkSelect = Number(eventSelect);
  const [hoverMax, setHoverMax] = useState(false);

  useEffect(() => {
    if (!pkSelect) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  });

  const handleSelectChange = (event: string) => {
    setEventSelect(event);
  };

  console.log("Participants: ", participants);

  const handleBook = async (pk: number) => {

    if (Number(participants) > 10){
      setHoverMax(true)
      return
    }

    if (!pk || !sessionkey) {
      setOpen(false);
      return;
    } else {

      try {
        const response = await axios.post(
          `${apiUrl}/user/events/${pk}/join/`,
          {
            participants: participants,
          },
          {
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          setDialogMessage(false);
          console.log("Booked Successfully");
          setOpen(true);
        }
      } catch (error: any) {
        console.log("Full error: ", error); // log the full error for debugging
        const errorDetails = error.response?.data?.detail;
        const statusCode = error.response?.status;
        if (statusCode === 400) {
          setDialogMessage(true);
          setOpenFalse(true);
          console.log(errorDetails);
          setErrorMessage(errorDetails);
        }
      }
    }
  };

  const handleNewBooking = () => {
    setNewBooking(true);
  };

  useEffect(() =>{
    if (Number(participants) > 10){
      setHoverMax(true)
    }else{
      setHoverMax(false)
    }
  }, [participants])

  return (
    <div className="w-[60%] min-w-[350px]">
      <div className="flex gap-2 w-full mt-10"></div>
      <div className="w-full flex flex-col gap-2">
        {newBooking ? (
          <>
            <div>
              <ArrowLeft
                strokeWidth={1}
                onClick={() => setNewBooking(!newBooking)}
                color="white"
                className="cursor-pointer"
              ></ArrowLeft>
            </div>
            <NewBooking></NewBooking>
          </>
        ) : (
          <>
            <Label className="text-white font-light text-[12px]">Event</Label>
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="rounded-lg  h-10 bg-transparent border-[#595B5C] text-white">
                <SelectValue placeholder="Select Event"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                {event_list.map((item) => (
                  <SelectItem value={item.pk}>{item.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <HoverCard open={hoverMax}>
              <HoverCardTrigger>
                <BookParticipants
                  value={participants}
                  onChange={(e: any) => setParticipants(e.target.value)}
                ></BookParticipants>
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-[12px] text-[red]">Max participant is 10</p>
              </HoverCardContent>
            </HoverCard>
            {dialogMessage ? (
              <>
                <BookedFailed
                  disabled={disabled}
                  open={openFalse}
                  close={() => setOpenFalse(false)}
                  message={errorMessage}
                  bookBtn={() => handleBook(pkSelect)}
                ></BookedFailed>
              </>
            ) : (
              <>
                <BookedSuccess
                  disabled={disabled}
                  open={open}
                  close={() => setOpen(false)}
                  bookBtn={() => handleBook(pkSelect)}
                ></BookedSuccess>
              </>
            )}

            <BookCalendar onClick={handleNewBooking}></BookCalendar>
          </>
        )}
      </div>
      <div></div>
    </div>
  );
}
