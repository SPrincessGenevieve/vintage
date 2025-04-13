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

  const { sessionkey, setUserDetails } = useUserContext();

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [display, setDisplay] = useState("");
  const [success, setSuccess] = useState(false)

  const handleSave = async () => {
    console.log("Clicked");
    setLoading(true);
    if (!password || !confirmPassword || !currentPassword) {
      setMessage("Please input your current password.");
      setMessageColor("text-[red]");
      setLoading(false);
      setTimeout(() => {
        setDisplay("hidden");
      }, 3000);
      return;
    } else if (confirmPassword !== password) {
      setMessage("Password do not match");
      setMessageColor("text-[red]");
      setLoading(false);
      setTimeout(() => {
        setDisplay("hidden");
      }, 3000);
      return;
    } else if (!password) {
      setMessage("Current password is required");
      setMessageColor("text-[red]");
      setLoading(false);
      setTimeout(() => {
        setDisplay("hidden");
      }, 3000);
      return;
    }
    const updatedData = {
      new_password1: password,
      new_password2: confirmPassword,
      current_password: currentPassword,
    };

    const formData = new FormData();
    formData.append("new_password1", updatedData.new_password1);
    formData.append("new_password2", updatedData.new_password2);
    formData.append("current_password", updatedData.current_password);

    // Optionally, send data to the backend here
    const authHeader = "Token " + sessionkey;
    try {
      const response = await axios.post(
        `${apiUrl}/auth/password/change/`,
        {
          new_password1: password,
          new_password2: confirmPassword,
          current_password: currentPassword,
        },
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "multipart/form-data", // Set content-type to multipart/form-data for file upload
          },
        }
      );
      console.log("Data updated successfully!");
      setMessage("Password updated successfully!");
      setMessageColor("text-[#00B050]");
      if (response.status === 200) {
        setSuccess(true)
        setPassword("");
        setCurrentPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setDisplay("hidden");
        }, 5000);
      }
    } catch (error: any) {
      console.error("Error saving data:", error.response || error.message);
      setMessage(error.response.data.detail);
      setMessageColor("text-[red]");
      console.log("Error: ", error.response.data.detail);
      setTimeout(() => {
        setDisplay("hidden");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setPassword("");
    setCurrentPassword("");
    setConfirmPassword("");
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
