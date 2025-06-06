import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleAlert } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import MasterCard from "@/images/mastercard.png";
import WithdrawForm from "./withdraw-form";
import { useUserContext } from "@/app/context/UserContext";
import { PaymentIcon } from "react-svg-credit-card-payment-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "../layout/contact-form";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function WithdrawDialog() {
  const { pay_method, sessionkey, setUserDetails } = useUserContext();
  const [isDisabled, setIsDisabled] = useState(true);
  const [contact, setContact] = useState(false);

  const data = pay_method?.[0] || {}; // Use optional chaining and provide default value

  useEffect(() => {
    setIsDisabled(!pay_method || pay_method.length === 0); // Check if pay_method is valid
  }, [pay_method]);

  const handleContact = () => {
    setContact(true);
  };

  return (
    <>
      <Dialog open={contact} onOpenChange={setContact}>
        <DialogContent className="max-w-screen-md">
          <DialogHeader>
            <DialogTitle className="text-[16px] font-normal">
              Contact the Support Desk
            </DialogTitle>
            {/* <DialogDescription className="text-[12px]">
                  Choose between the set up debit or new bank account.
                </DialogDescription> */}
          </DialogHeader>
          <div className="flex gap-8 mt-5">
            <div>
              <h1 className="text-[14px]">Email</h1>
              <span className="text-muted-foreground text-[11px]">
                support@vintage-associates.co.uk
              </span>
            </div>
          </div>
          <ContactForm />
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild disabled={isDisabled}>
          <Button
            size="sm"
            variant="outline"
            className="rounded-full border-red-800 text-sm px-8 hover:bg-red-800 hover:text-white text-red-800"
          >
            Withdraw
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-normal">
              Withdraw your funds
            </DialogTitle>
            <DialogDescription>
              Choose between the set up debit or new bank account.
            </DialogDescription>
          </DialogHeader>
          {/* Mastercard information */}
          <div className="border rounded-lg px-5 md:px-10 py-2 md:py-5 mt-5">
            <div className="flex items-center gap-10">
              <div className="h-auto w-[120px]">
                <PaymentIcon
                  type={
                    (data.brand as
                      | "Alipay"
                      | "Amex"
                      | "Code"
                      | "CodeFront"
                      | "Diners"
                      | "Discover"
                      | "Elo"
                      | "Generic"
                      | "Hiper"
                      | "Hipercard"
                      | "Jcb"
                      | "Maestro"
                      | "Mastercard"
                      | "Mir"
                      | "Paypal"
                      | "Unionpay"
                      | "Visa") || ""
                  }
                  format="flatRounded"
                  width={100}
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-light capitalize">
                  {data.brand || ""}
                </h1>
                <span className="text-xs text-red-500">
                  Expiry {data.exp_month || ""}/{data.exp_year || ""}
                </span>
                <span className="text-xs pt-5">
                  Ending number: {data.last4 || ""}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-8">
              <CircleAlert
                strokeWidth={1.3}
                size={20}
                className="text-orange-600"
              />
              <span className="text-orange-600 font-light text-sm">
                Note: We processed withdrawal within 2-5 working days.
              </span>
            </div>
          </div>
          <WithdrawForm />
          <span className="text-muted-foreground text-xs">
            Forgot to put your account ID in notes?{" "}
            <Link href="#" onClick={handleContact} className="underline">
              Contact us
            </Link>
          </span>
        </DialogContent>
      </Dialog>
    </>
  );
}
