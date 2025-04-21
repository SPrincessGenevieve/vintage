"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUserContext } from "@/app/context/UserContext";
import axios from "axios";
import SpinnerIcon from "@/images/Spinner";
import Image from "next/image";
import { Upload } from "lucide-react";
import DefaultUser from "@/images/user-placeholder.jpg";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { RelationshipSelect } from "@/lib/utils";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogTitle } from "../ui/dialog";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function SubAccountForm() {
  const { sessionkey, userData, setUserDetails } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [relationship, setRelationship] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null | File>();
  const authHeader = "Token " + sessionkey;
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false)

  const imageSrc =
    uploadedImage instanceof File
      ? URL.createObjectURL(uploadedImage) // Convert File to URL
      : uploadedImage || DefaultUser; // Use the string URL or fallback to default image

  const [originalData, setOriginalData] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    relationship: null,
    uploadedImage: null as string | null,
  });

  const handleNewSubAccount = async () => {
    setLoading(true);
  
    setTimeout(() =>{
      setLoading(false)
      setOpen(true)
      setTimeout(() =>{
        location.reload()
      }, 1000)
    }, 1000)
  };

  console.log("RELATIONSHIP: ", relationship);

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so +1
    return `${year}-${month}-${day}`;
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Success</DialogTitle>
          <p>Created sub-account successfully.</p>
        </DialogContent>
      </Dialog>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
            <Image
              src={imageSrc}
              alt="user-img"
              width={70}
              height={70}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="gen-text-l">
              {uploadedImage ? "PROFILE PICTURE" : "PROFILE PICTURE"}
            </p>
            <span className="text-xs text-muted-foreground gen-text-sm">
              PNG, JPG, and SVG are accepted
            </span>
          </div>
        </div>
        <Button
          onClick={() => imageInputRef.current?.click()}
          className="bg-[#c4ad93] hover:bg-[#dfbd96] flex items-center text-sm rounded-3xl text-black/70 font-normal py-1"
        >
          <Upload strokeWidth={1.3} size={20} />
          Upload
        </Button>
        <Input
          onChange={handleImageUpload}
          ref={imageInputRef}
          className="hidden"
          type="file"
          id="profile_picture"
        />
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex w-full gap-4">
          <div className="w-full">
            <Label htmlFor="first_name" className="text-[12px] font-normal">
              First Name
            </Label>
            <Input
              id="first_name"
              name="first_tname"
              type="text"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="text-[12px] w-full"
            />
          </div>
          <div className="w-full">
            <Label htmlFor="last_name" className="text-[12px] font-normal">
              Last Name
            </Label>
            <Input
              id="last_name"
              name="last_name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
              required
              className="text-[12px] w-full"
            />
          </div>
        </div>
        <div className="flex w-full gap-4">
          <div className="w-full">
            <Label htmlFor="date_of_birth" className="text-[12px] font-normal">
              Date of Birth
            </Label>
            <div className="relative w-full flex items-center">
              <p className=" text-[12px] flex items-center absolute bg-white h-[35px] ml-4">
                {birthdate}
              </p>
              <Input
                id="date_of_birth"
                name="date_of_birth"
                type="date"
                value={birthdate}
                onChange={(e) => setBirthDate(formatDate(e.target.value))}
                className="w-full text-[12px] h-10 flex pl-[30%]  text-white"
                required
              />
            </div>
          </div>

          <div className="w-full">
            <Label htmlFor="last_name" className="text-[12px] font-normal">
              Relationship
            </Label>
            <Select
              value={relationship}
              onValueChange={(e) => setRelationship(e)}
            >
              <SelectTrigger className="rounded-xl h-10">
                <p className="w-full text-left capitalize">{relationship}</p>
              </SelectTrigger>
              <SelectContent>
                {RelationshipSelect.map((item) => (
                  <SelectItem
                    value={item.value}
                    className="hover:bg-gray-100 p-2 rounded-md"
                  >
                    <p>{item.name}</p>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4">
          <Button
            onClick={handleNewSubAccount}
            className="w-full text-[14px] rounded-full"
          >
            {loading ? (
              <div>
                <SpinnerIcon stroke_color="white"></SpinnerIcon>
              </div>
            ) : (
              <></>
            )}
            Create account
          </Button>
        </div>
      </div>
    </div>
  );
}
