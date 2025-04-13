"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { settingsLinks } from "./settings-links";
import SpinnerIcon from "@/images/Spinner";

export default function SettingsHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition(); // Detect pending state for navigation
  const [loadingLink, setLoadingLink] = useState<string | null>(null); // Track which link is loading

  const handleLinkClick = (href: string) => {
    setLoadingLink(href);
    startTransition(() => {
      router.push(href); // Programmatically navigate to the selected link
    });
  };

  return (
    <div className="border-b p-4">
      <h1 className="font-semibold text-xl">Settings</h1>
      <p className="font-light text-muted-foreground">
        Manage all client information.
      </p>
      <nav className="mt-10 flex flex-wrap items-center gap-0 md:gap-2 lg:gap-14">
        {settingsLinks.map((item, index) => (
          <div
            key={index}
            onClick={() => handleLinkClick(item.href)}
            className={`cursor-pointer flex items-center gap-2 px-3 md:px-4 py-2 rounded-full text-sm hover:bg-primary hover:text-white ${
              pathname === item.href ? "bg-primary text-white" : ""
            }`}
          >
            {/* Show spinner only if the current link is clicked and loading */}
            {isPending && loadingLink === item.href ? (
              <div className="w-5">
                <SpinnerIcon strokeColor="white" />
              </div>
            ) : null}
            <div>
              <p>{item.name}</p>
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}
