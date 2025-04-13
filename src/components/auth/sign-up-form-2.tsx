"use client";
import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import ArrowRight from "@/icons/ph_arrow-up.svg";
import ArrowLeft from "@/icons/left-arrow.svg";
import Link from "next/link";
import { useUserContext } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";
import { BudgetData } from "@/lib/mock-data";
import { InvestmentYearData } from "@/lib/mock-data";
import Loading from "../loading";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import AgreementViewer from "./agreement_viewer";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// Find the root element

export default function SignupFormTwo() {
  const {
    email,
    password1,
    password2,
    signed_agreement,
    phone_number,
    budget,
    sessionkey,
    investment_time,
    invested_before,
    first_name,
    last_name,
    birth_date,
    state,
    city,
    street_address,
    postal_code,
    kyc_verify,
    otp_validated,
    country,
    otp_verify,
    mfa,
    setUserDetails,
  } = useUserContext();

  const navigate = useRouter();
  const [otpUrl, setOtpUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Loading state added
  const [agree, setAgree] = useState(false);
  const [hoverOpen, setHoverOpen] = useState(false);
  const [budgetLabel, setBudgetLabel] = useState("");
  const [durationLabel, setDurationLabel] = useState("");
  const [historyLabel, setHistoryLabel] = useState("");

  const [budgetLocal, setBudget] = useState<string | undefined>(
    budget ? String(budget) : undefined
  );

  const [investmentTimeLocal, setInvestmentTime] = useState<string | undefined>(
    investment_time || undefined
  );

  const [investedBeforeLocal, setInvestedBefore] = useState<string | undefined>(
    invested_before === null ? undefined : invested_before ? "true" : "false"
  );

  // Sync context values with local state when component mounts
  useEffect(() => {
    setBudget(budget !== 0 ? String(budget) : undefined); // Ensure null values are handled properly
    setInvestmentTime(investment_time || undefined); // Ensure investmentTime is handled
    setInvestedBefore(
      invested_before === null ? undefined : invested_before ? "true" : "false"
    );
  }, [budget, investment_time, invested_before]);

  const handleBudgetChange = (value: string) => {
    const numberValue = Number(value);
    setUserDetails({ budget: isNaN(numberValue) ? 0 : numberValue });
  };

  const handleInvestmentTimeChange = (value: string) => {
    setUserDetails({ investment_time: value });
  };

  const handleInvestedBeforeChange = (value: string) => {
    setUserDetails({ invested_before: value === "true" });
  };

  const handleAgree = () => {
    setAgree(!agree);
  };

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true when the request starts
    if (!budgetLocal) {
      setLoading(false);
      setBudgetLabel("border-[red]");
      setTimeout(() => {
        setBudgetLabel("");
      }, 3000);
      return;
    }
    if (!investmentTimeLocal) {
      setLoading(false);
      setDurationLabel("border-[red]");
      setTimeout(() => {
        setDurationLabel("");
      }, 3000);
      return;
    }
    if (!investedBeforeLocal) {
      setLoading(false);
      setHistoryLabel("border-[red]");
      setTimeout(() => {
        setHistoryLabel("");
      }, 3000);
      return;
    }

    const data_post = {
      email,
      password1,
      password2,
      phone_number,
      budget,
      investment_time,
      invested_before,
      first_name,
      last_name,
      kyc_verify,
      otp_validated,
      otp_verify,
      mfa,
      signed_agreement: agree,
      birth_date,
      country,
      state,
      city,
      street_address,
      postal_code,
    };

    if (agree !== true) {
      setLoading(false);
      setHoverOpen(true);
      setTimeout(() => {
        setHoverOpen(false);
      }, 3000);
      return;
    }

    try {
      console.log("DATA: ", data_post);
      const response = await axios.post(
        `${apiUrl}/auth/registration/`,
        data_post,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        // Assuming 201 for successful registration
        const authHeader = "Token " + response.data.key; // Basic Authentication header
        setUserDetails({
          sessionkey: response.data.key,
        });
        const otpResponse = await axios.post(
          `${apiUrl}/auth/otp/generate/`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: authHeader,
            },
          }
        );

        console.log("Email: ", email);

        const { otpauth_url } = otpResponse.data;

        setOtpUrl(otpauth_url);
        navigate.push(
          `/auth/sign-up-5?otpauth_url=${encodeURIComponent(otpauth_url)}`
        );
      }
    } catch (error: any) {
      const { response, message } = error;

      if (response) {
        console.error(
          `Error ${response.status}: ${response.statusText || "Bad Request"}`
        );

        if (response.data) {
          // Display validation errors in alerts
          if (response.data.email) {
            alert(`${response.data.email.join(" ")}`);
          }
          if (response.data.password1) {
            alert(`Password Error: ${response.data.password1.join(" ")}`);
          }
          // You can add more fields to handle specific errors
        }
      } else {
        // Fallback to a general error message
        alert("An error occurred: " + (message || error));
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate.back(); // This will navigate to the previous page
  };

  return (
    <>
      {loading && (
        <div className="absolute w-full h-full top-0 left-0">
          <Loading visible={loading} />
        </div>
      )}
      <div className="flex flex-col gap-5 gap-select">
        <div>
          <Label htmlFor="budget" className="text-[14px] font-normal">
            How much is your budget?
          </Label>
          <Select value={budgetLocal} onValueChange={handleBudgetChange}>
            <SelectTrigger className={`border ${budgetLabel}`}>
              <SelectValue placeholder="Select budget" />
            </SelectTrigger>
            <SelectContent>
              {BudgetData.map((item) => (
                <SelectItem key={item.budget} value={String(item.budget)}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="investment_time" className="text-[14px] font-normal">
            How long do you want to invest for?
          </Label>
          <Select
            value={investmentTimeLocal}
            onValueChange={handleInvestmentTimeChange}
          >
            <SelectTrigger className={`border ${durationLabel}`}>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {InvestmentYearData.map((item) => (
                <SelectItem key={item.investment} value={item.investment}>
                  {item.investment}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label
            htmlFor="investment_experience"
            className="text-[14px] font-normal"
          >
            Have you invested before?
          </Label>
          <Select
            value={investedBeforeLocal}
            onValueChange={handleInvestedBeforeChange}
          >
            <SelectTrigger className={`border ${historyLabel}`}>
              <SelectValue placeholder="Please select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <HoverCard open={hoverOpen}>
          <HoverCardTrigger>
            <div className="flex gap-2 items-center">
              <Checkbox onClick={handleAgree}></Checkbox>
              <p className="text-[14px]">
                I agree to the{" "}
                <Dialog>
                  <DialogTrigger>
                    <p className="text-blue-600">Terms and Conditions</p>
                  </DialogTrigger>
                  <DialogContent className="max-w-[100vh] max-h-[90%] h-full w-full overflow-auto">
                    <AgreementViewer></AgreementViewer>
                  </DialogContent>
                </Dialog>
              </p>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            <p className="text-[12px]">
              To continue, please check the box below to accept our Terms and
              Conditions.
            </p>
          </HoverCardContent>
        </HoverCard>

        <div className="mt-4 flex justify-between">
          <Link
            onClick={handleGoBack}
            href=""
            className="flex bg-white border border-gray-400 text-black rounded-3xl p-2 w-[170px] items-center justify-center"
          >
            <ArrowLeft /> Previous
          </Link>
          <Link
            onClick={handleSubmit}
            className="flex bg-[#104144] text-white rounded-3xl p-2 w-[170px] items-center justify-center"
            href={""}
          >
            Next <ArrowRight />
          </Link>
        </div>
      </div>
    </>
  );
}
