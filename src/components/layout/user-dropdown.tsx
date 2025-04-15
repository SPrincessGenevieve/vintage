"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Settings,
  LogOut,
  Ellipsis,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SampleUser from "@/images/user-placeholder.jpg";
import { Button } from "../ui/button";
import ContactDialog from "./contact-dialog";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/context/UserContext";
import { useState } from "react";
import Loading from "../loading";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import SpinnerIcon from "@/images/Spinner";
import { UserData } from "@/lib/data/user";


export default function UserDropdown() {
  const router = useRouter(); // Use Next.js router for navigation
  const [loading, setLoading] = useState(false); // Loading state added
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const {
    setUserDetails,
    profile_picture,
    email,
  } = useUserContext();
  const userData = UserData


  const profilePictureSrc =
    typeof profile_picture === "string"
      ? profile_picture
      : profile_picture instanceof File
      ? URL.createObjectURL(profile_picture)
      : SampleUser; // Fallback to a default image if profile_picture is null

  // Handle log out
  const handleLogout = async () => {
    setLoading(true);
    setUserDetails({
      isLoggedIn: false,
    });

    setTimeout(() => {
      router.push("/auth/sign-in");
      setLoading(false);
    }, 2000);
  };

  const handleConfirm = async () => {
    setOpenConfirm(true);
  };

  return (
    <>
      {loading && (
        <div className="absolute w-full h-full top-0 left-0">
          <Loading visible={loading} />
        </div>
      )}
      <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <DialogContent>
          <DialogTitle className="font-semibold">
            Logout Confirmation
          </DialogTitle>
          <p>Are you sure you want to log out?</p>
          <div className="flex gap-2 w-full">
            <Button
              onClick={() => setOpenConfirm(!openConfirm)}
              className="w-full rounded-3xl border bg-red-700 text-white"
              variant="ghost"
            >
              No
            </Button>{" "}
            <Button onClick={handleLogout} className="w-full rounded-3xl">
              {loading && (
                <div>
                  <SpinnerIcon strokeColor="white"></SpinnerIcon>
                </div>
              )}Yes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <DropdownMenu onOpenChange={setOpen} open={open}>
        <DropdownMenuTrigger asChild className="p-0 m-0">
          <Button
            className="outline-none active:border-none border-none p-0 h-auto rounded-full"
            variant="ghost"
          >
            <div className="w-[35px] h-[35px] border-black border-2 rounded-full flex items-center justify-center">
              <Ellipsis className="w-full h-full"></Ellipsis>
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[250px] h-[auto] mr-5">
          {/* Dropdown label: User info */}
          <DropdownMenuLabel>
            <div className="flex items-center gap-3">
              <Image
                src={profilePictureSrc}
                width={300}
                height={300}
                alt="user"
                className="rounded-full border-2 border-primary w-[30px] h-[30px]"
              />

              <div>
                <h1 className="text-[15px] font-medium">
                  {userData.first_name} {userData.last_name}
                </h1>
                <p className="font-light text-[11px]">{email}</p>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          <div className="hover:cursor-pointer rounded-sm hover:bg-muted flex gap-2 h-8">
            <ContactDialog />
          </div>
          {/* More Links */}
          <DropdownMenuItem className="hover:cursor-pointer hover:bg-muted h-8">
            <Link
              href="/dashboard/settings"
              className="w-full flex items-center gap-2"
            >
              <Settings size={22} strokeWidth={1.3} />
              <p className="text-[12px]">Settings</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleConfirm}
            className="hover:cursor-pointer hover:bg-muted flex gap-2 h-8"
          >
            <LogOut size={22} strokeWidth={1.3} />
            <p className="text-[12px]">Log out</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
