"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Progress } from "../ui/progress";
import phone from "@/images/phone.png";
import Image from "next/image";
import AppStore from "@/images/app-store.png";
import PlayStore from "@/images/google-play.png";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface GuideProps {
  handleNext: () => void;
}

export default function SignUP5Guide({ handleNext }: GuideProps) {
  const navigate = useRouter();
  const handleGoBack = () => {
    navigate.back(); // This will navigate to the previous page
  };

  return (
    <div>
      <div className="flex relative flex-col mt-14 gap-y-5 h-auto w-[500px] sign-up-progress-top">
        <div className="h-[70%] flex flex-col justify-center items-center">
          <div className="p-2 border-[3px] border-black rounded-full w-[120px] h-auto flex justify-center items-center">
            <Image
              src={phone}
              width={400}
              height={400}
              alt="phone"
              className="w-[100px] h-auto"
            ></Image>
          </div>
          <p className="text-[25px] text-center">
            Download Google Authenticator
          </p>
          <p className="text-center text-[14px] text-gray-500">
            You need an authenticator app on your phone. If you already have
            google Authenticator (or a different app), click next.{" "}
          </p>
          <div className="flex gap-2 my-5">
            <Link
              target="_blank"
              href={
                "https://apps.apple.com/us/app/google-authenticator/id388497605"
              }
              className="p-0 m-0 hover:scale-105 transition ease-in-out"
            >
              <Image
                src={AppStore}
                width={400}
                height={400}
                alt="app"
                className="w-auto h-auto"
              ></Image>
            </Link>
            <Link
              target="_blank"
              href={
                "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en"
              }
              className="p-0 m-0 hover:scale-105 transition ease-in-out"
            >
              <Image
                src={PlayStore}
                width={400}
                height={400}
                alt="app"
                className="w-auto h-auto"
              ></Image>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
