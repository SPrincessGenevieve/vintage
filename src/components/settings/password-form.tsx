"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Check, CheckCircle, CircleCheck, Save } from "lucide-react";
import { useState } from "react";
import { useUserContext } from "@/app/context/UserContext";
import axios from "axios";
import SpinnerIcon from "@/images/Spinner";
import { Dialog, DialogContent } from "../ui/dialog";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function PasswordForm() {
  const [loading, setLoading] = useState(false);

  const { password, setUserDetails } = useUserContext();

  const [oldPassword, setOldPassword] = useState(password);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [display, setDisplay] = useState("");
  const [success, setSuccess] = useState(false);

  console.log("pass: ", password);

  const handleSave = async () => {
    console.log("Clicked");
    setLoading(true);
  
    if (!newpassword || !confirmPassword || !currentPassword) {
      setMessage("Please input your current password.");
      setMessageColor("text-[red]");
      setLoading(false);
      return;
    }
  
    if (oldPassword !== currentPassword) {
      setMessage("The current password you entered is incorrect. Please try again.");
      setMessageColor("text-[red]");
      setLoading(false);
      return;
    }
  
    if (confirmPassword !== newpassword) {
      setMessage("Passwords do not match");
      setMessageColor("text-[red]");
      setLoading(false);
      return;
    }
  
    if (!newpassword) {
      setMessage("New password is required");
      setMessageColor("text-[red]");
      setLoading(false);
      return;
    }
  
    // continue to update
    const updatedData = {
      new_password1: newpassword,
      new_password2: confirmPassword,
      current_password: currentPassword,
    };
  
    setUserDetails({
      password: newpassword,
    });
  
    setMessage("Password updated successfully!");
    setMessageColor("text-[#00B050]");
    setSuccess(true);
  
    // Clear form fields
    setNewPassword("");
    setCurrentPassword("");
    setConfirmPassword("");
  
    setTimeout(() => {
      setLoading(false);
      setDisplay("hidden");
    }, 2000);
  };
  

  const handleCancel = () => {
    setNewPassword("");
    setCurrentPassword("");
    setConfirmPassword("");
    setDisplay("hidden")
  };

  return (
    <div className="flex flex-col gap-10 min-w-[300px] w-[50%]">
      <Dialog open={success} onOpenChange={setSuccess}>
        <DialogContent>
          <div className="flex flex-col items-center justify-center">
            <CircleCheck size={70} color="#3DBB69"></CircleCheck>
            <p>Your Password has been updated</p>
            <p className="text-[20px]">Successfully!</p>
          </div>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <Label
            htmlFor="current_password"
            className="text-sm font-normal gen-text-sm"
          >
            Current Password
          </Label>
          <Input
            className=" h-10 !text-sm gen-text-sm"
            id="current_password"
            name="current_password"
            type="password"
            placeholder="***************"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label
            htmlFor="new_password"
            className="text-sm font-normal gen-text-sm"
          >
            New Password
          </Label>
          <Input
            className=" h-10 !text-sm gen-text-sm"
            id="new_password"
            name="new_password"
            type="password"
            placeholder="***************"
            required
            value={newpassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label
            htmlFor="confirm_new_password"
            className="text-sm font-normal gen-text-sm"
          >
            Confirm new password
          </Label>
          <Input
            className=" h-10 !text-sm gen-text-sm"
            id="confirm_new_password"
            name="confirm_new_password"
            type="password"
            placeholder="***************"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className={`w-full h-7 flex items-center ${display}`}>
          <p className={messageColor}>{message}</p>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="text-sm w-full py-5 rounded-3xl"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          size="sm"
          onClick={handleSave}
          className="text-sm w-full flex items-center py-5 rounded-3xl"
        >
          {loading ? (
            <>
              <SpinnerIcon strokeColor="white"></SpinnerIcon>
            </>
          ) : (
            <></>
          )}
          <Save strokeWidth={1.3} size={20} />
          Save
        </Button>
      </div>
    </div>
  );
}
