"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/context/UserContext"; // Import context to access user session

import SigninForm from "@/components/auth/sign-in-form";
import MobileAppsLinks from "@/components/auth/mobile-apps-links";

export default function Signin() {

  return (
    <div className="mt-14 w-full flex flex-col items-center sign-in-cont">
      <div className="mfa-cont w-[70%] h-full flex flex-col justify-center">
        <SigninForm />
      </div>
    </div>
  );
}
