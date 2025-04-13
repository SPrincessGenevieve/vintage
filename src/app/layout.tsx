"use client";
import { usePathname } from "next/navigation"; // Import usePathname from next/navigation
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UserContext";
import { useEffect, useState } from "react";
import withAuth from "./withAuth";
import Bot from "@/components/bot";
import { PostHogProvider } from "./providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // specify the weights you need
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current pathname
  const [aiBotAssist, setAIBotAssist] = useState(false);
  const [openBot, setOpenBot] = useState("max-h-0");

  // Check if the current route matches '/dashboard/orders'
  const isDashboardOrdersPage =
    pathname === "/dashboard/orders" ||
    pathname === "/dashboard/orders/checkout";

  const handleOpenBot = () => {
    setAIBotAssist(!aiBotAssist);
  };

  useEffect(() => {
    if (aiBotAssist === true) {
      setOpenBot("max-h-[90%]"); // Change to max-height
    } else {
      setOpenBot("max-h-0"); // Change to max-height
    }
  }, [aiBotAssist]);

  return (
    <html lang="en">
      {/* Conditionally render scripts based on the current route */}

      <body className={`${poppins.variable} antialiased`}>
        <UserProvider>
          <PostHogProvider>{children}</PostHogProvider>
        </UserProvider>
        <ToastContainer style={{ width: 400 }} />
      </body>
    </html>
  );
}
