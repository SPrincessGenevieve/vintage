import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import SpinnerIcon from "@/images/Spinner";
import { useUserContext } from "@/app/context/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Destructure the props object
export default function DiscontinueWine({
  isOwnerText,
  wine_name,
  investment_id,
}: {
  investment_id: number | null;
  isOwnerText: string;
  wine_name: string;
}) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const { setUserDetails, sessionkey } = useUserContext();
  const [loading, setLoading] = useState(false);
  const authHeader = "Token " + sessionkey;

  const handleCancelWine = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${apiUrl}/api/wine/investment/${investment_id}/?action=cancel_sell`,{},
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        }
      );

      location.reload();
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
        setLoading(false);
    }
  };

  const handleClose = () => {
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="">
        <Button
          onClick={handleClose}
          variant={"ghost"}
          className={`w-full gen-text-sm rounded-full flex justify-start text-[12px] ${isOwnerText}`}
        >
          Discontinue Wine
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Confirm Removal of Wine</DialogTitle>
        <p className="text-[14px]">
          Are you sure you want to remove {wine_name} from your shop?
        </p>
        <div className="flex gap-2">
          <Button
            onClick={() => setOpen(false)}
            className="py-2 text-[14px] w-full rounded-full"
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCancelWine}
            className="py-2 text-[14px] w-full rounded-full"
          >
            {loading ? (
               <div>
               <SpinnerIcon strokeColor="white"></SpinnerIcon>
             </div>
            ) : (
             <></>
            )}
            Yes, Remove Wine
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
