"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useUserContext } from "@/app/context/UserContext";
import axios from "axios";
import { useState } from "react";
import SpinnerIcon from "@/images/Spinner";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function WithdrawForm() {
  const { balance, sessionkey } = useUserContext();
  const authHeader = "Token " + sessionkey;
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [borderColor, setBorderColor] = useState("");
  const [warning, setWarning] = useState(false);
  const [error, setError] = useState(false);
  const [errorCancel, setErrorCancel] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorCancelMessage, setErrorCancelMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [message, setMessage] = useState(false);

  const handleWidthdraw = async () => {
    if (amount === 0) {
      setBorderColor("border-[red]");
      setWarning(true);
      setTimeout(() => {
        setBorderColor("");
        setWarning(false);
      }, 2000);
      return;
    }
    setLoading(true);
    setSuccessMessage(true);
    setTimeout(() => {
      setLoading(false);
      setError(false);
      setSuccessMessage(false);
    }, 3000);
  };

  const handleCancel = async () => {
    setLoadingCancel(true);
    try {
      const response = await axios.post(
        `${apiUrl}/user/request-withdrawal/?action=cancel_withdrawal `,
        {},
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(true);
    } catch (error) {
      console.log("ERROR: ", error);
      setErrorCancel(true);
      setErrorCancelMessage("No pending withdrawal request found.");
    } finally {
      setLoadingCancel(false);
      setTimeout(() => {
        setMessage(false);
        setErrorCancel(false);
      }, 3000);
    }
  };

  console.log("NUMBERRRR: ", amount);

  return (
    <div className="flex flex-col gap-2 mt-10">
      <div className="flex flex-col gap-3">
        <Label
          htmlFor="withdraw_amount"
          className="flex items-center justify-between text-sm font-normal"
        >
          <span>Amount</span>
          <span>Available Balance: £{Number(balance).toLocaleString()}</span>
        </Label>
        <Input
          className={`py-2 px-4 !text-sm text-center ${borderColor}`}
          id="withdraw_amount"
          name="withdraw_amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.valueAsNumber)}
          placeholder="000000"
          required
        />
        {warning && <p className="text-[red]">Please input an amount</p>}
        {error && <p className="text-[red]">{errorMessage}</p>}
        {errorCancel && <p className="text-[red]">{errorCancelMessage}</p>}
        {message && <p className="text-green-500">Cancelled successfully</p>}
        {successMessage && (
          <p className="text-green-500">
            Your request will be processed by the administrator soon
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <Button
          onClick={handleCancel}
          size="sm"
          variant="ghost"
          className="text-sm w-full rounded-full border"
        >
          {loadingCancel && (
            <div>
              <SpinnerIcon strokeColor="black"></SpinnerIcon>
            </div>
          )}
          Cancel
        </Button>
        <Button
          onClick={handleWidthdraw}
          size="sm"
          className="text-sm w-full rounded-full bg-red-800 hover:bg-red-900"
        >
          {loading && (
            <div>
              <SpinnerIcon strokeColor="white"></SpinnerIcon>
            </div>
          )}
          Withdraw
        </Button>
      </div>
    </div>
  );
}
