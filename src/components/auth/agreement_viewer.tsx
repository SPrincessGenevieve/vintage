import React from "react";
import { termsPages } from "@/lib/utils";
import Image from "next/image";
import { Download, FileDown } from "lucide-react";
import Link from "next/link";

// Create Document Component
export default function AgreementViewer() {
  return (
    <Link
      target="_blank"
      href="/terms.pdf"
      className="flex h-full w-full flex-col p-2 relative"
    >
      {termsPages.map((item) => (
        <Image alt="image" src={item.image} className="w-full h-full"></Image>
      ))}
    </Link>
  );
}
