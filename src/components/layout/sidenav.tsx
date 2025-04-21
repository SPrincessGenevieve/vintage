import React, { useState, useEffect } from "react";
import { links } from "./links";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/images/auth-header.png";
import { Button } from "../ui/button";
import "./../../app/globals.css";
import LevelGradient from "../LevelGradient";
import LoadingDot from "@/images/loaddot";
import { useUserContext } from "@/app/context/UserContext";

export default function Sidenav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<string | null>(null); // Track the loading state of clicked link
  const { is_old_user } = useUserContext();
  const [isHidden, setIsHidden] = useState("hidden");
  const handleClick = (href: string) => {
    setIsLoading(href); // Set the loading state to the clicked link's href
    router.push(href); // Programmatically navigate to the new page
  };

  useEffect(() => {
    setIsLoading(null); // Reset loading state when pathname changes
    if (is_old_user === undefined){
      return
    }
    if (is_old_user === true) {
      setIsHidden("hidden");
    } else {
        setIsHidden("");
    }
  }, [pathname, is_old_user]);


  return (
    <div className="hidden md:flex lg:flex-shrink-0 bg-white">
      <div className="flex flex-col w-48 border-r border-gray-200 h-auto pr-2">
        <div className="flex-1 flex flex-col pt-3 pb-4 overflow-y-auto">
          <div className="flex justify-center mt-5 sidebar-logo-cont">
            <Image src={Logo} alt="" className="sidebar-logo" />
          </div>
          <div className="mt-5 ml-2">
            {links.map((item, index) => (
              <div
                key={index}
                className={`sidebar-link relative py-3 my-2 cursor-pointer ${
                  (pathname === "/dashboard" && item.href === "/dashboard") ||
                  (pathname.startsWith("/dashboard") &&
                    pathname.startsWith(item.href) &&
                    item.href !== "/dashboard")
                    ? "bg-[#C4AD93] text-white"
                    : ""
                } flex items-center gap-4 hover:bg-[#C4AD93] hover:text-white rounded-md p-1.5  cursor-pointer`}
                onClick={() => handleClick(item.href)} // Handle click to set loading state and navigate
              >
                <div className="w-[30px] justify-center flex cursor-pointer">
                  {React.cloneElement(item.icon, {
                    stroke_color:
                      (pathname === "/dashboard" &&
                        item.href === "/dashboard") ||
                      (pathname.startsWith("/dashboard") &&
                        pathname.startsWith(item.href) &&
                        item.href !== "/dashboard")
                        ? "white"
                        : "black",
                  })}
                </div>
                <h1 className="text-[12px] font-normal sidebar-text  cursor-pointer">
                  {item.name}
                </h1>
                {isLoading === item.href && ( // Show loading dot only for the clicked link
                  <div className="absolute right-2 w-[20px]">
                    <LoadingDot />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div
            className={`flex flex-col items-center justify-end h-full ${isHidden}`}
          >
            <h1 className="text-[12px]">Investment Level:</h1>

            {/* Filter the MockProfileLevelData to match level_info name */}
            <LevelGradient></LevelGradient>

            <Link href="#" className="text-blue-400 text-sm ">
              <Button variant="ghost" className="text-[12px] text-blue-400">
                View all
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
