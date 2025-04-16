"use client";

import UserMasterCard from "@/components/settings/user-mastercard";
import BillingHistoryTable from "@/components/settings/billing-history-table";
import DepositDialog from "@/components/settings/deposit-dialog";
import WithdrawDialog from "@/components/settings/withdraw-dialog";
import withAuth from "@/app/withAuth";
import PaymentDialog from "@/components/checkout/payment-dialog";
import { useUserContext } from "@/app/context/UserContext";
import { UserData } from "@/lib/data/user";
function Billing() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: "{{CLIENT_SECRET}}",
  };
  
  const paid_fee = UserData.paid_fee
  

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1>Payment Method</h1>
          <span className="text-muted-foreground text-sm">
            Card, Debit, Credit method for payment.
          </span>
        </div>
        {/* Buttons */}
        <div className="flex items-center gap-2">
          <WithdrawDialog />
          <DepositDialog />
        </div>
      </div>
      {/* User Master Card Information*/}
      {/* <UserMasterCard /> */}
      <PaymentDialog></PaymentDialog>
      {/* Billing History */}
      <div className="my-5">
        <div className="flex justify-between">
          <div>
            <h1>History</h1>
            <span className="text-muted-foreground text-sm">
              All billing history made.
            </span>
          </div>
          <div>
            <p className="text-[14px]">Paid Fees: £{paid_fee.toLocaleString()}</p>
          </div>
        </div>
        <BillingHistoryTable />
      </div>
    </div>
  );
}

export default withAuth(Billing);
