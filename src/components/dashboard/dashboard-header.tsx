"use client";
import { ChevronDown, ChevronUp, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUserContext } from "@/app/context/UserContext";
import DefaultUserProfile from "@/images/user-placeholder.jpg";
import { useRouter } from "next/navigation";
import axios, { all } from "axios";
import AddSubAccountDialog from "../layout/add-sub-account-dialog";
import Loading from "../loading";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import DepositDialog from "../settings/deposit-dialog";
import { UserData } from "@/lib/data/user";
import { SubAccountData } from "@/lib/data/sub-accounts";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function DashboardHeader() {
  // State to track the selected item
  const [selectedUser, setSelectedUser] = useState("");
  const { profile_picture, sessionkey, setUserDetails } = useUserContext();
  const authHeader = "Token " + sessionkey;
  const [open, setOpen] = useState(false);
  const [sub_account_id, setSubAccountID] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isInvestment, setIsInvestment] = useState(false);

  const sub_accounts = SubAccountData;

  setUserDetails({
    user_now_id: sub_account_id,
  });

  console.log(sub_account_id);

  useEffect(() => {
    if (!selectedUser) {
      setSelectedUser(UserData.first_name);
    }
  }, [selectedUser]);

  const all_account = [
    {
      id: null,
      first_name: UserData.first_name,
      last_name: UserData.last_name,
      birth_date: "",
      created_at: "",
      profile_picture: UserData.profile_picture,
      user: "",
    },
    ...sub_accounts,
  ];

  const full_name = UserData.first_name + " " + UserData.last_name;

  const profilePictureSrc =
    typeof profile_picture === "string"
      ? profile_picture
      : profile_picture instanceof File
      ? URL.createObjectURL(profile_picture)
      : DefaultUserProfile; // Fallback to a default image if profile_picture is null

  useEffect(() => {
    if (!sessionkey) {
      return;
    }
    const fetchData = async () => {
      if (selectedUser === UserData.first_name || selectedUser === "") {
        setUserDetails({
          first_name: UserData.first_name,
          last_name: UserData.last_name,
          portfolio_performance: UserData.portfolio_performance,
          current_market_value: UserData.current_market_value,
          assets_by_region: UserData.assets_by_region,
          case_due: UserData.case_due,
          profit_loss: UserData.profit_loss,
          total_case: UserData.total_case,
          investment: UserData.investment,
          dashboard_title: "Current Investment",
          dashboard_value: UserData.life_time_investment,
          case_due_state: UserData.case_due,
          total_withdrawn_state: UserData.total_withdrawn,
          cases_sold_state: UserData.cases_sold,
          profit_loss_money_state: UserData.profit_loss_money,
          total_cases_state: UserData.total_case,
        });
        setSubAccountID(0);
      } else {
        setUserDetails({
          cases_sold_state: 0,
          profit_loss_money_state: 0,
        });
      }
    };
    fetchData();
  }, [selectedUser, sessionkey]);

  const handleGetSubAccounts = async () => {
    setOpen(!open);
  };

  const handleSetSubAccount = async (index: number) => {
    setIsVisible(true);
    let fname = all_account[index].first_name;
    let lname = all_account[index].last_name;
    let id = all_account[index].id || 0;
    let user = all_account[index].user;
    let profile = all_account[index].profile_picture;

    try {
      if (fname === UserData.first_name || "") {
        setUserDetails({
          first_name: UserData.first_name,
          last_name: UserData.last_name,
          portfolio_performance: UserData.portfolio_performance,
          current_market_value: UserData.current_market_value,
          assets_by_region: UserData.assets_by_region,
          case_due: UserData.case_due,
          profit_loss: UserData.profit_loss,
          total_case: UserData.total_case,
          investment: UserData.investment,
          dashboard_title: "Current Investment",
          dashboard_value: UserData.life_time_investment,
          case_due_state: UserData.case_due,
          total_withdrawn_state: UserData.total_withdrawn,
          cases_sold_state: UserData.cases_sold,
          profit_loss_money_state: UserData.profit_loss_money,
          total_cases_state: UserData.total_case,
          profile_picture: UserData.profile_picture,
        });
        setSubAccountID(0);
      } else {
        console.log("ASSETS: ", sub_accounts[index].assets_by_region);
        setSubAccountID(id);
        setUserDetails({
          first_name: fname,
          last_name: lname,
          portfolio_performance: sub_accounts[index].portfolio_performance,
          current_market_value: sub_accounts[index].current_market_value,
          assets_by_region: sub_accounts[index].assets_by_region,
          case_due: sub_accounts[index].case_due,
          profit_loss: sub_accounts[index].profit_loss,
          total_case: sub_accounts[index].total_case,
          investment: sub_accounts[index].investments,
          dashboard_title: "Total Investment",
          dashboard_value: sub_accounts[index].total_investments,
          total_cases_state: sub_accounts[index].total_case,
          case_due_state: 0,
          total_withdrawn_state: "0",
          cases_sold_state: 0,
          profit_loss_money_state: 0,
          profile_picture: profile,
        });
      }
    } catch (error) {
      console.log("ERROR: ", error);
      setIsInvestment(true);
      setSelectedUser(UserData.first_name);
    } finally {
      setIsVisible(false);
    }
  };

  const handleDeleteSubAccount = async (index: number) => {
    const id = all_account[index].id;
    try {
      const response = await axios.delete(`${apiUrl}/user/sub-accounts/${id}`, {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log("ERROR: ", error);
    } finally {
      location.reload();
    }
  };

  return (
    <div className="bg-white w-full">
      <Loading visible={isVisible}></Loading>
      <Dialog open={isInvestment} onOpenChange={setIsInvestment}>
        <DialogContent>
          <DialogTitle>No Investments Found</DialogTitle>
          <p>Please select a different sub-account.</p>
        </DialogContent>
      </Dialog>
      <div className="flex justify-between w-full px-4 py-2">
        <div className="flex flex-col justify-center">
          <h1 className="font-semibold text-[16px]">Dashboard</h1>
          {/* <p className="font-light text-[12px] text-muted-foreground">
            Summary of your account.
          </p> */}
        </div>
        <div className="flex gap-3 items-center justify-center">
          {/* DEPOSIT GROUP */}
          <DepositDialog></DepositDialog>

          {/* ACCOUNT GROUP */}
          <div className="w-full">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger onClick={handleGetSubAccounts}>
                  {open ? <ChevronUp /> : <ChevronDown />}
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-[12px] font-muted-foreground font-light">
                      {selectedUser === "main" ? (
                        <p>{full_name}</p>
                      ) : (
                        <p>{selectedUser}</p>
                      )}
                    </span>
                    <Image
                      className="h-7 w-7 rounded-full"
                      // src={
                      //   item.profile_picture || DefaultUserProfile
                      // }
                      src={profilePictureSrc || DefaultUserProfile}
                      alt={"User"}
                      width={30}
                      height={30}
                    />
                  </div>
                </MenubarTrigger>
                <MenubarContent>
                  {all_account.map((item, index) => (
                    <div className="w-full flex flex-col" key={index}>
                      <div className="w-full flex gap-2">
                        <MenubarCheckboxItem
                          checked={selectedUser === item.first_name}
                          onCheckedChange={() => {
                            setSelectedUser(item.first_name);
                            handleSetSubAccount(index); // Trigger sub-account change
                          }}
                          className="w-full flex justify-start"
                        >
                          <div className="flex items-center gap-3">
                            <Image
                              // src={
                              //   item.first_name === "Main"
                              //     ? profilePictureSrc
                              //     : DefaultUserProfile
                              // }
                              src={item.profile_picture || DefaultUserProfile}
                              width={400}
                              height={400}
                              alt="user"
                              className="rounded-full border-[2px] w-[25px] h-[25px] border-gray-300"
                            />
                            <h1 className="font-light text-[12px]">
                              {item.first_name} {item.last_name}
                            </h1>
                          </div>
                        </MenubarCheckboxItem>
                        <Button
                          onClick={() => handleDeleteSubAccount(index)}
                          className="p-0 h-auto mr-2"
                          variant="ghost"
                          disabled={
                            item.first_name === UserData.first_name
                              ? true
                              : false
                          }
                        >
                          <Trash color="red"></Trash>
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className="w-full p-2 cursor-pointer">
                    <AddSubAccountDialog />
                  </div>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
    </div>
  );
}
