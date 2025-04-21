"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown, Edit, Save, Upload, User } from "lucide-react";
import Image from "next/image";
import DefaultUser from "@/images/profile.png";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useUserContext } from "@/app/context/UserContext";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import defaultFlag from "@/images/default-flag.png";
import UpdateEmail from "./update-email";
import SpinnerIcon from "@/images/Spinner";
import SearchSelect from "../search-select";
import CountrySelect from "./country-select";
import { country_list } from "@/lib/country-data";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import UserData from "@/lib/json/general.json"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function GeneralForm() {
  const {
    userData,
    email,
    first_name,
    last_name,
    phone_number,
    budget,
    birth_date,
    country,
    state,
    city,
    street_address,
    postal_code,
    investment_time,
    invested_before,
    profile_picture,
    sessionkey,
    setUserDetails,
  } = useUserContext();
  const [uploadedImage, setUploadedImage] = useState<string | null | File>(
    UserData.profile_picture || profile_picture
  );
  const [loading, setLoading] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [countryData, setCountryData] = useState("");
  const [stateData, setStateData] = useState("");
  const [cityData, setCityData] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalData, setPostalData] = useState("");
  const [emailUser, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [display, setDisplay] = useState("");
  const [color, setColor] = useState("");
  const [phone, setPhone] = useState("");
  const [budgetUser, setBudgetUser] = useState<number | null>(0);
  const [duration, setDuration] = useState("");
  const [investor, setInvestor] = useState<string>("");
  const [success, setSucces] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setFirstname(first_name);
    setBirthDate(birth_date);
    setCountryData(country);
    setStateData(state);
    setCityData(city);
    setStreetAddress(street_address);
    setPostalData(postal_code);
    setLastname(last_name);
    setEmail(email);
    setPhone(phone_number);
    setBudgetUser(budget);
    setDuration(investment_time);
    setInvestor(invested_before ? "Yes" : "No");

    
  }, []);

  // Store the original data
  const [originalData, setOriginalData] = useState({
    firstname: "",
    lastname: "",
    emailUser: "",
    phone: "",
    birthDate: "",
    countryData: "",
    stateData: "",
    cityData: "",
    streetAddress: "",
    postalData: "",
    budgetUser: null,
    duration: "",
    investor: null,
    uploadedImage: null as string | null,
  });

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  const handleSave = async () => {
    // Create an object of the updated fields, only including the changed fields

    setLoading(true);

    // Check if each field has changed before adding it to the updatedData
    if (firstname !== originalData.firstname)
      setUserDetails({
        first_name: firstname,
      });
    if (lastname !== originalData.lastname)
      setUserDetails({
        last_name: lastname,
      });

    if (phone !== originalData.phone)
      setUserDetails({
        phone_number: phone,
      });

    if (budgetUser !== originalData.budgetUser)
      setUserDetails({
        budget: Number(budgetUser),
      });

    if (duration !== originalData.duration)
      setUserDetails({
        investment_time: duration,
      });

    if (investor !== originalData.investor)
      setUserDetails({
        invested_before: investor === "Yes" ? true : false,
      });

    if (birthDate !== originalData.birthDate)
      setUserDetails({
        birth_date: birthDate,
      });

    if (streetAddress !== originalData.streetAddress)
      setUserDetails({
        street_address: streetAddress,
      });

    if (cityData !== originalData.cityData)
      setUserDetails({
        city: cityData,
      });

    if (stateData !== originalData.stateData)
      setUserDetails({
        state: stateData,
      });

    if (postalData !== originalData.postalData)
      setUserDetails({
        postal_code: postalData,
      });

    if (countryData !== originalData.countryData)
      setUserDetails({
        country: countryData,
      });

    console.log("Data updated successfully!");
    setMessage("Data updated successfully!");
    setSucces(true);
    setColor("text-[#00B050]");
    // Hide the success/error message after 3 seconds
    setTimeout(() => {
      setLoading(false);
      setDisplay("hidden");
      setSucces(false);
    }, 1000);
  };

  // Cancel function
  const handleCancel = () => {
    // Revert all form fields back to the original values
    setFirstname(originalData.firstname);
    setLastname(originalData.lastname);
    setEmail(originalData.emailUser);
    setPhone(originalData.phone);
    setBirthDate(originalData.birthDate);
    setCountryData(originalData.countryData);
    setStateData(originalData.stateData);
    setCityData(originalData.cityData);
    setStreetAddress(originalData.streetAddress);
    setPostalData(originalData.postalData);
    setBudgetUser(originalData.budgetUser);
    setDuration(originalData.duration);
    setInvestor(originalData.investor ? "Yes" : "No");
    setUploadedImage(originalData.uploadedImage);
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBudgetUser(value === "" ? null : Number(value)); // Convert empty string to null
  };

  const imageSrc =
    uploadedImage instanceof File
      ? URL.createObjectURL(uploadedImage) // Convert File to URL
      : uploadedImage || DefaultUser; // Use the string URL or fallback to default image

  return (
    <div className="flex flex-col gap-5 h-auto w-full">
      <Dialog open={success}>
        <DialogContent>
          <div className="w-full flex flex-col items-center justify-center">
            <div className="flex items-center justify-center border-[5px] border-[#2E5257] rounded-full w-[100px] h-[100px]">
              <User color="#2E5257" size={70}></User>
            </div>
            <p className="text-center text-[18px]">Profile Update Successful</p>
            <p className="text-center text-[12px]">
              Your profile details have been successfully updated!
            </p>
          </div>
        </DialogContent>
      </Dialog>
      <div className={`${display}`}>
        <p className={`${color}`}>{message}</p>
      </div>
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
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="first_name"
            className="text-sm font-normal gen-text-sm"
          >
            First Name
          </Label>
          <Input
            className="!text-sm h-10"
            id="first_name"
            name="first_name"
            type="text"
            value={firstname || UserData.first_name}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div>
          <Label
            htmlFor="last_name"
            className="text-sm font-normal gen-text-sm"
          >
            Last Name
          </Label>
          <Input
            className="!text-sm h-10"
            id="last_name"
            name="last_name"
            type="text"
            value={lastname || UserData.last_name}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="first_name"
            className="text-sm font-normal gen-text-sm"
          >
            Birthdate
          </Label>
          <Input
            className="!text-sm h-10"
            id="birth_date"
            name="birth_date"
            type="date"
            value={birthDate || UserData.birth_date}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </div>
        <div>
          <Label
            htmlFor="first_name"
            className="text-sm font-normal gen-text-sm"
          >
            Country
          </Label>
          <div className="relative">
            {/* <Input
              className="h-10 "
              value={countryData}
              onChange={(e) => setCountryData(e.target.value)}
            ></Input> */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between rounded-lg "
                >
                  {/* Include the image before the text */}
                  {countryData ? (
                    <div className="flex gap-2 items-center">
                      <Image
                        src={
                          country_list.find((item) => item.name === countryData)
                            ?.image || "default-image.png"
                        }
                        alt="Country flag"
                        width={400}
                        height={400}
                        className="w-[25px] h-[25px]"
                      />
                      <p>
                        {
                          country_list.find((item) => item.name === countryData)
                            ?.name
                        }
                      </p>
                    </div>
                  ) : (
                    "Select country..."
                  )}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput
                    placeholder="Search framework..."
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup>
                      {country_list.map((item) => (
                        <CommandItem
                          key={item.name}
                          value={item.name}
                          onSelect={(currentValue) => {
                            setCountryData(
                              currentValue === countryData ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <Image
                            src={item.image}
                            alt={""}
                            width={400}
                            height={400}
                            className="w-[30px] h-[30px]"
                          ></Image>{" "}
                          {item.name}
                          <Check
                            className={cn(
                              "ml-auto",
                              countryData === item.name
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {/* <div className="absolute z-10 w-full">
              <CountrySelect
                value={countryData}
                setValue={(e) => setCountryData(e)}
              ></CountrySelect>
            </div> */}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="first_name"
            className="text-sm font-normal gen-text-sm"
          >
            County
          </Label>
          <Input
            className="!text-sm h-10"
            id="state"
            name="state"
            type="text"
            value={stateData || UserData.state}
            onChange={(e) => setStateData(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="city" className="text-sm font-normal gen-text-sm">
            City
          </Label>
          <Input
            className="!text-sm h-10"
            id="city"
            name="city"
            type="text"
            value={cityData || UserData.city}
            onChange={(e) => setCityData(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="first_name"
            className="text-sm font-normal gen-text-sm"
          >
            Street Address
          </Label>
          <Input
            className="!text-sm h-10"
            id="street"
            name="street"
            type="text"
            value={streetAddress || UserData.street_address}
            onChange={(e) => setStreetAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <Label
            htmlFor="postalcode"
            className="text-sm font-normal gen-text-sm"
          >
            Postal Code
          </Label>
          <Input
            className="!text-sm h-10"
            id="postal"
            name="postal"
            type="text"
            value={postalData || UserData.postal_code}
            onChange={(e) => setPostalData(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <Label htmlFor="email" className="text-sm font-normal gen-text-sm">
            Email
          </Label>
          <Input
            className="!text-sm h-10"
            id="email"
            name="email"
            type="email"
            value={emailUser || UserData.email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />
          <UpdateEmail></UpdateEmail>
        </div>
        <div>
          <Label
            htmlFor="phone_number"
            className="text-sm font-normal gen-text-sm"
          >
            Phone #
          </Label>
          <Input
            className="h-10 !text-sm"
            id="phone_number"
            name="phone_number"
            type="text"
            value={phone || UserData.phone_number}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 pt-10">
        <div>
          <Label htmlFor="budget" className="text-sm font-normal gen-text-sm">
            How much is your budget?
          </Label>
          <Input
            className="h-10 !text-sm"
            id="budget"
            name="budget"
            type="number"
            value={String(budgetUser) || UserData.budget }
            onChange={handleBudgetChange}
            required
          />
        </div>
        <div>
          <Label
            htmlFor="investment_time"
            className="text-sm font-normal gen-text-sm"
          >
            How long do you want to invest for?
          </Label>
          <Select
            name="investment_time"
            value={duration || UserData.investment_time}
            onValueChange={setDuration}
          >
            <SelectTrigger className="text-left py-5 px-4 text-sm gen-text-sm">
              <SelectValue className="text-left" placeholder={duration || UserData.investment_time} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1 - 2 years">1 - 2 years</SelectItem>
                <SelectItem value="2 - 5 years">2 - 5 years</SelectItem>
                <SelectItem value="5 - 10 years">5 - 10 years</SelectItem>
                <SelectItem value="10+ years">10+ years</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label
            htmlFor="investment_experience"
            className="text-sm font-normal gen-text-sm text-left"
          >
            Have you invested before?
          </Label>
          <Select
            name="investment_experience"
            value={investor}
            onValueChange={setInvestor}
          >
            <SelectTrigger className="py-5 px-4 text-sm gen-text-sm text-left">
              <SelectValue placeholder={investor} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
          onClick={handleSave}
          size="sm"
          className="text-sm w-full flex items-center py-5 rounded-3xl"
        >
          {loading ? (
            <>
              <SpinnerIcon stroke_color="white"></SpinnerIcon>
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
