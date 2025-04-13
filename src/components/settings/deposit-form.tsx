"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import axios from "axios";
import { useUserContext } from "@/app/context/UserContext";
import { useState, useEffect } from "react";
import SpinnerIcon from "@/images/Spinner";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function DepositForm() {
  const router = useRouter()
  const { link_account, sessionkey, setUserDetails } = useUserContext();
  const authHeader = "Token " + sessionkey;
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [borderColor, setBorderColor] = useState("");
  const [warning, setWarning] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  console.log("AMOUNT: ", amount)
  const handleDeposit = async () => {
    if (amount <= 0 || !amount) {
      setBorderColor("border-[red]");
      setWarning(true);
      setTimeout(() => {
        setBorderColor("");
        setWarning(false);
      }, 2000);
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(
        `${apiUrl}/plaid/deposit`,
        {
          value: amount,
        },
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        }
      );

      setUserDetails({
        link_account: response.data,
      });
      router.push(`/dashboard/settings/billing/link-account/${response.data.link_token}`)
    } catch (error) {
      console.log("ERROR: ", error);
      setError(true);
      setErrorMessage("You already have a pending withdrawal request.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  console.log("LINKING ACCOUNT: ", link_account);

  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="flex flex-col gap-3">
        {/* <Label htmlFor="deposit_amount" className="text-sm font-normal">
          Done depositing? Enter the exact amount and click to verify.
        </Label> */}
        <Input
          className="py-2 px-4 !text-sm text-center"
          id="deposit_amount"
          name="deposit_amount"
          type="number"
          onChange={(e) => setAmount(e.target.valueAsNumber)}
          value={amount}
          placeholder="000000"
          required
        />
        {warning && <p className="text-[red]">Please input more than 0</p>}
        {error && <p className="text-[red]">{errorMessage}</p>}
      </div>
      <Button onClick={handleDeposit} size="sm" className="text-sm w-full rounded-3xl">
        {loading && (
          <div>
            <SpinnerIcon strokeColor="white"></SpinnerIcon>
          </div>
        )}
        Make a deposit
      </Button>
    </div>
  );
}
