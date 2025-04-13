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
  CircleHelp,
  Settings,
  LogOut,
  CheckCheck,
  FileCheck,
  UserRoundCheck,
  Trash,
  EllipsisVertical,
  Ellipsis,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SampleUser from "@/images/user-placeholder.jpg";
import AddSubAccountDialog from "./add-sub-account-dialog";
import { MockSubAccounts } from "@/lib/mock-data";
import { Button } from "../ui/button";
import ContactDialog from "./contact-dialog";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/context/UserContext";
import { useState } from "react";
import Loading from "../loading";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function UserDropdown() {
  const router = useRouter(); // Use Next.js router for navigation
  const [loading, setLoading] = useState(false); // Loading state added
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const {
    setUserDetails,
    resetUserDetails,
    profile_picture,
    userData,
    first_name,
    last_name,
    selectedAccountIndex,
    email,
    sub_accounts,
    sessionkey,
  } = useUserContext();

  const authHeader = "Token " + sessionkey;

  const profilePictureSrc =
    typeof profile_picture === "string"
      ? profile_picture
      : profile_picture instanceof File
      ? URL.createObjectURL(profile_picture)
      : SampleUser; // Fallback to a default image if profile_picture is null

  // Handle log out
  const handleLogout = async () => {
    try {
      // Make POST request to log out
      setLoading(true);
      const response = await axios.post(`${apiUrl}/auth/logout/`);

      if (response.status === 200) {
        // Clear all relevant items from localStorage and session storage
        localStorage.clear(); // Clear all local storage
        sessionStorage.clear(); // Clear session storage if used
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(
              /=.*/,
              "=;expires=" + new Date().toUTCString() + ";path=/"
            );
        }); // Clear cookies if applicable

        // Reset context to default
        resetUserDetails();

        console.log("Logout successful");

        // Force reload to clear any cached data from memory
        router.push("/auth/sign-in");
        router.refresh(); // This will force the data to refresh

        // Optionally, force a hard reload
        window.location.reload();
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
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
              Yes
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
            {/* <Image
              src={profilePictureSrc}
              width={300}
              height={300}
              alt="user"
              className="rounded-full border-2 border-primary w-[35px] h-[35px]"
            /> */}
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
