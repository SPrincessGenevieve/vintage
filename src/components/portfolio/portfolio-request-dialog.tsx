import React, { useEffect, useState } from "react";
import { WineCardT } from "@/lib/types";
import { AlertCircleIcon, CircleAlert, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { InvestmentListType, WineParentType } from "@/app/context/UserContext";
import { Textarea } from "../ui/textarea";
import CountriesSelect from "../settings/country-select";
import axios from "axios";
import { country_list } from "@/lib/country-data";
import { useUserContext } from "@/app/context/UserContext";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Adjust import path based on your library
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Button } from "../ui/button";
import SpinnerIcon from "@/images/Spinner";

interface PortfolioSellDialogProps {
  item: InvestmentListType;
  parent: WineParentType;
}

interface CountryType {
  name: string;
  code: string;
  emoji: string;
  unicode: string;
  image: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function PortfolioGiftDialog({
  item,
  parent,
}: PortfolioSellDialogProps) {
  const { sessionkey } = useUserContext();
  const authHeader = "Token " + sessionkey; // Basic Authentication header

  const [caseSize, setCaseSize] = useState("1x75");
  const [loading, setLoading] = useState(false);
  const bottleSize = item.bottle_size;
  const [name, setName] = useState("");
  const [flag, setFlag] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [delivery_date, setDeliveryDate] = useState("");
  const [contact, setContact] = useState("");
  const [county, setCounty] = useState("");
  const [postal, setPostal] = useState("");
  const [note, setNote] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>(
    null
  );
  const [country, setCountry] = useState("");
  const [quantity, setQuantity] = useState<number>(1);

  const data = {
    investment_id: item.id,
    quantity: quantity,
    contact_name: name,
    tel_no: contact,
    notes: note,
    email: email,
    delivery_date: delivery_date,
    address1: address,
    address2: address2,
    town_or_county: county,
    country: country,
    postcode: postal,
  };

  useEffect(() => {
    const caseSizing = () => {
      if (item.case_size === 1) {
        setCaseSize("1x75");
      } else if (item.case_size === 3) {
        setCaseSize("3x75");
      } else if (item.case_size === 6) {
        setCaseSize("6x75");
      } else if (item.case_size === 12) {
        setCaseSize("12x75");
      }
    };
    setCountry(String(selectedCountry?.name));
    caseSizing();
  });

  const handleDeliveryRequest = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/wine/delivery-request/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        }
      );
      location.reload();
    } catch (error) {
      console.log("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleIncrease = () => {
    if (quantity < item.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(item.quantity, Number(e.target.value)));
    setQuantity(value);
  };

  return (
    <div className="">
      <div className="border rounded-2xl mb-5">
        <div className="border rounded-2xl p-2">
          <div className="relative flex flex-col h-[180px]">
            <div className="flex justify-center p-2 absolute rounded-full w-full items-center">
              <Image
                width={300}
                height={300}
                src={item.wine_image}
                alt="card"
                className="z-20 w-auto max-h-[150px]"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-[12px] font-semibold">{item.wine_name}</p>
            <div className="text-gray-400 flex justify-between">
              <p className="text-[10px] font-light">Vintage</p>
              <p className="text-[10px] font-light">{item.vintage}</p>
            </div>
            <div className="text-gray-400 flex justify-between">
              <p className="text-[10px] font-light">Quantity</p>
              <p className="text-[10px] font-light">{item.quantity}</p>
            </div>
            <div className="text-gray-400 flex justify-between">
              <p className="text-[10px] font-light">Case Size</p>
              <p className="text-[10px] font-light">
                {item.case_size}
                {bottleSize === "0750"
                  ? "x75cl"
                  : bottleSize === "1500"
                  ? "x150cl"
                  : bottleSize === "3000"
                  ? "x300cl"
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Description */}

      <div className="flex flex-col">
        <div className="w-auto gap-2 flex flex-col justify-center items-center">
          <div className="relative border rounded-xl px-2  flex gap-2 items-center justify-center">
            <p>Quantity</p>

            <HoverCard>
              <HoverCardTrigger className="flex w-full h-full items-center justify-center">
                <button onClick={handleDecrease} disabled={quantity <= 1}>
                  <Minus color="red" size={20} className="gen-text-s" />
                </button>

                <Input
                  value={quantity}
                  type="number"
                  min={1}
                  max={item.quantity}
                  onChange={handleChange}
                  className="border-none p-2 outline-none text-[14px] text-center w-16"
                />

                <button
                  onClick={handleIncrease}
                  disabled={quantity >= item.quantity}
                >
                  <Plus size={20} className="text-green-700" />
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="flex items-center w-auto gap-2">
                <AlertCircleIcon color="#ff8800" size={20} />
                <p className="text-[12px]">Max quantity: {item.quantity}</p>
              </HoverCardContent>
            </HoverCard>
          </div>
          {/* <p className="text-[12px]">Quantity</p> */}
        </div>
        <Label className="font-light py-3">Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-10"
          placeholder=""
          type="text"
        ></Input>

        <Label className="font-light py-3">Email</Label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-10"
          placeholder=""
          type="email"
        ></Input>

        <Label className="font-light py-3">Tel/Contact #</Label>
        <Input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="h-10"
          placeholder=""
          type="text"
        ></Input>

        <Label className="font-light py-3">Delivery Date</Label>
        <Input
          value={delivery_date}
          onChange={(e) => setDeliveryDate(e.target.value)}
          className="h-10"
          placeholder=""
          type="date"
        ></Input>

        <Label className="font-light py-3">Address</Label>
        <Textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="h-10"
          placeholder=""
        ></Textarea>
        <Label className="font-light py-3">Address Line 1</Label>
        <Textarea
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
          className="h-10"
          placeholder=""
        ></Textarea>

        <Label className="font-light py-3">Country</Label>
        <Select
          value={selectedCountry?.name || ""}
          onValueChange={(name) => {
            const selected =
              country_list.find((item) => item.name === name) || null;
            setSelectedCountry(selected); // Now it will set 'null' if no country is found
          }}
        >
          <SelectTrigger className="w-full h-10 border border-[#EAEAEA] rounded-xl">
            <div className="w-full flex gap-2 items-center">
              {selectedCountry ? (
                <>
                  <Image
                    alt={selectedCountry.name}
                    src={selectedCountry.image}
                    width={25}
                    height={25}
                  />
                  <p>{selectedCountry.name}</p>
                </>
              ) : (
                <p>Select country</p>
              )}
            </div>
          </SelectTrigger>

          <SelectContent>
            {country_list.map((item) => (
              <SelectItem key={item.name} value={item.name} className="flex">
                <div className="w-full flex gap-2 items-center">
                  <Image
                    alt={item.name}
                    src={item.image}
                    width={25}
                    height={25}
                  />
                  <p>{item.name}</p>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Label className="font-light py-3">Town/County</Label>
        <Input
          value={county}
          onChange={(e) => setCounty(e.target.value)}
          className="h-10"
          placeholder=""
          type="text"
        ></Input>

        <Label className="font-light py-3">Postal Code</Label>
        <Input
          value={postal}
          onChange={(e) => setPostal(e.target.value)}
          className="h-10"
          placeholder=""
          type="text"
        ></Input>

        <Label className="font-light py-3">Note</Label>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="h-10"
          placeholder=""
        ></Textarea>
      </div>
      <div className="flex gap-2 justify-center h-10  items-center">
        <div className="flex gap-2">
          <CircleAlert color="#EC841A" size={15}></CircleAlert>
          <p className="text-[12px] font-thin text-center">
            Please allow 3 - 5 business days for your wine to be delivered.
          </p>
        </div>
      </div>
      <div className="flex justify-around gap-4">
        <Button
          className="rounded-full w-40 bg-transparent border text-gray-400 hover:text-white
              "
        >
          Cancel
        </Button>
        <Button onClick={handleDeliveryRequest} className="rounded-full w-40">
          {loading && (
            <div>
              <SpinnerIcon strokeColor="white"></SpinnerIcon>
            </div>
          )}
          Deliver
        </Button>
      </div>
    </div>
  );
}
