"use client";
import Image from "next/image";
import Spinner from "@/images/spinner.svg";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      router.push("/auth/sign-in"); // Redirect to sign-in if the path is "/"
    }
  }, [pathname, router]);

  return (
    <div className="absolute z-50 w-full h-full bg-[#ffffff5c] flex items-center justify-center">
      <div className="w-[100px] h-full flex items-center justify-center">
        <Spinner />
      </div>
    </div>
  );
}
