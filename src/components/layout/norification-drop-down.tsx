"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { NotificationType, useUserContext } from "@/app/context/UserContext";
import Image from "next/image";
import { Button } from "../ui/button";
import SpinnerIcon from "@/images/Spinner";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface ReadType {
  read: boolean;
  id: number;
  borderColor: string;
  bgColor: string;
}

export default function NotificationDropdown() {
  const { sessionkey, notification_count, setUserDetails } = useUserContext();
  const [notifData, setNotifData] = useState<NotificationType[] | null>(null);
  const [loadingState, setLoadingState] = useState<{ [key: number]: string }>(
    {}
  );
  const [readStatus, setReadStatus] = useState<{ [key: number]: boolean }>({});
  const [open, setOpen] = useState(false);
  const authHeader = "Token " + sessionkey;
  const [countNotif, setCountNotif] = useState(0)

  // Load readStatus from localStorage on component mount
  useEffect(() => {
    const savedReadStatus = localStorage.getItem("readStatus");
    if (savedReadStatus) {
      setReadStatus(JSON.parse(savedReadStatus));
    }
  }, []);

  const [isRead, setIsRead] = useState<ReadType>({
    read: false,
    id: 0,
    borderColor: "border-[#5b94ff]",
    bgColor: "bg-[#d3e2ff]",
  });

  const handleAccept = async (investment: number, id: number) => {
    console.log("INVESTMENT: ", investment)
    setLoadingState((prevState) => ({ ...prevState, [id]: "accepting" }));
    try {
      const response = await axios.post(
        `${apiUrl}/auth/notification/?accept=true`,
        {
          investment_id: investment,
          alert_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log("ACCEPTED");
        const response = await axios.get(`${apiUrl}/auth/notification/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        });
        setNotifData(response.data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoadingState((prevState) => ({ ...prevState, [id]: "" }));
    }
  };

  const handleReject = async (investment: number, id: number) => {
    setLoadingState((prevState) => ({ ...prevState, [id]: "rejecting" }));
    try {
      const response = await axios.post(
        `${apiUrl}/auth/notification/?reject=true`,
        {
          investment_id: investment,
          alert_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log("REJECTED");
        const response = await axios.get(`${apiUrl}/auth/notification/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        });
        setNotifData(response.data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoadingState((prevState) => ({ ...prevState, [id]: "" }));
    }
  };

  const handleRead = (id: number) => {
    setReadStatus((prevStatus) => {
      const updatedStatus = {
        ...prevStatus,
        [id]: true,
      };
      localStorage.setItem("readStatus", JSON.stringify(updatedStatus));
      return updatedStatus;
    });
  };

  const handleNotif = async () => {
    setOpen(!open);
    let count = 0
    try {
      const response = await axios.get(`${apiUrl}/auth/notification/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      });
      setNotifData(response.data);
      setUserDetails({
        notifications: response.data,
        notification_count: response.data.length()
      });
      console.log("NOTIF COUNT: ", response.data.length())
      setCountNotif(count)
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
    console.log("\n\n\n\n\n\n\n\n");
    console.log("COUNTING: ", count);
    console.log("\n\n\n\n\n\n\n\n");
  };

  useEffect(() =>{
    setUserDetails({
      notification_count: countNotif
    })
  }, [countNotif])




  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <div className="flex w-auto relative">
        <DropdownMenuTrigger asChild className="absolute z-10  cursor-pointer">
          <div onClick={handleNotif} className="">
            <Bell size={22} strokeWidth={1.3} />
            <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 bg-red-400 text-white text-xs font-bold rounded-full translate-x-1/2 -translate-y-1/2">
              {notification_count}
            </span>
          </div>
        </DropdownMenuTrigger>
        <div onClick={handleNotif} className="z-20  cursor-pointer">
          <Bell size={22} strokeWidth={1.3} />
          <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 bg-red-400 text-white text-xs font-bold rounded-full translate-x-1/2 -translate-y-1/2">
            {notification_count}
          </span>
        </div>
      </div>
      <DropdownMenuContent className="w-[40vh] flex flex-col absolute right-0">
        <DropdownMenuLabel>
          <h1 className="text-[15px] font-normal notif-text">Notification</h1>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="flex flex-col gap-2 pl-2 pt-2 bg-[#f3f3f3] rounded-2xl max-h-[650px] overflow-y-auto overflow-x-auto notif-cont overflow-auto">
          {notifData && notifData.length > 0 ? (
            notifData.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col gap-2 p-2 rounded-xl border ${
                  readStatus[item.id]
                    ? "border-white bg-white"
                    : "border-[#5b94ff] bg-[#f0f5ff]"
                }`}
              >
                <div className="w-full flex">
                  <div className="flex h-[70px] w-[70px] justify-center items-center">
                    <Image
                      className="w-auto h-[70px]"
                      width={400}
                      height={400}
                      src={item.wine_image || item.image}
                      alt={""}
                    ></Image>
                  </div>
                  <div className="w-[70%] pr-2">
                    <p className="uppercase text-[14px]">{item.type}</p>
                    <p className="text-[11px] font-light">{item.title}</p>
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="flex gap-2">
                    {item.is_gift === true ? (
                      <>
                        <Button
                          onClick={() => handleAccept(item.investment, item.id)}
                          className="rounded-2xl text-[11px] p-0 m-0 h-5 w-[75px]"
                        >
                          <div
                            className={`${
                              loadingState[item.id] === "accepting"
                                ? ""
                                : "hidden"
                            }`}
                          >
                            <SpinnerIcon strokeColor="white"></SpinnerIcon>
                          </div>
                          Accept
                        </Button>
                        <Button
                          onClick={() => handleReject(item.investment, item.id)}
                          className="rounded-2xl text-[11px] p-0 m-0 h-5 bg-[#701212] w-[75px]"
                        >
                          <div
                            className={`${
                              loadingState[item.id] === "rejecting"
                                ? ""
                                : "hidden"
                            }`}
                          >
                            <SpinnerIcon strokeColor="white"></SpinnerIcon>
                          </div>
                          Reject
                        </Button>
                      </>
                    ) : (
                      <Dialog>
                        <DialogTrigger>
                          {" "}
                          <Button
                            onClick={() => handleRead(item.id)}
                            variant="ghost"
                            className="p-0 text-[#5b94ff] hover:bg-[transparent] hover:text-[#09b9ff] h-auto text-[11px] px-2"
                          >
                            view now
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <p
                            className={`uppercase shadow-black font-semibold w-full text-center rounded-t-2xl ${
                              item.action === "rejected"
                                ? "bg-[#ff00002c] text-[red]"
                                : item.action === "accepted"
                                ? "bg-[#00b04f54] text-[#1a8d5d]"
                                : ""
                            }`}
                          >
                            {item.action}
                          </p>
                          <div className="flex bg-white w-full justify-center items-center p-2 border rounded-b-2xl relative flex-col">
                            <Image
                              className="w-[150px] h-auto"
                              width={400}
                              height={400}
                              src={item.wine_image || item.wine_image}
                              alt={""}
                            ></Image>
                          </div>
                          <p className="text-[12px]">{item.title}</p>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No notifications to show.</div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
