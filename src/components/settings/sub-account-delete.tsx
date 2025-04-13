import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import SpinnerIcon from "@/images/Spinner";
import { useUserContext } from "@/app/context/UserContext";
import axios from "axios";

interface SubAccountType {
  open: boolean;
  setOpen: (open: boolean) => void;
  sub_account_index: number;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function SubAccountDelete({
  open,
  setOpen,
  sub_account_index,
}: SubAccountType) {
  const { sessionkey, sub_accounts } = useUserContext();
  const authHeader = "Token " + sessionkey; // Basic Authentication header
  const [loading, setLoading] = useState(false);

  const sub_id = sub_accounts[sub_account_index].id;
  console.log("SUBACCOUNT ID: ", sub_id);

  const handleDeleteSubAccount = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${apiUrl}/user/sub-accounts/${sub_id}`,
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        }
      );
      location.reload();
    } catch (error) {
      console.log("ERROR: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Delete Sub-account</DialogTitle>
          <div className="flex w-full gap-2 justify-between">
            <p className="text-[14px]">
              Are you sure you want to delete this account?
            </p>
          </div>

          <div className="w-full flex gap-4 mt-5 justify-center items-center">
            <Button
              onClick={() => setOpen(false)}
              className="border rounded-full w-[150px]"
              variant="ghost"
            >
              Cancel
            </Button>
            <Button
              className="rounded-full w-[150px] bg-red-800"
              onClick={handleDeleteSubAccount}
            >
              {loading ? (
                <>
                  <div>
                    <SpinnerIcon strokeColor="white"></SpinnerIcon>
                  </div>
                </>
              ) : (
                <></>
              )}
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
