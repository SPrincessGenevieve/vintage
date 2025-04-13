'use client'
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useUserContext } from "@/app/context/UserContext";
import { useEffect, useState } from "react";

export default function CartLink() {
  const { cartCount, sessionkey, setUserDetails } = useUserContext();
  const [count, setCount] = useState(cartCount);
  
  useEffect(() => {
    setCount(cartCount)
  }, [cartCount, sessionkey]);

  return (
    <Link href="/dashboard/orders">
      <div className="relative">
        <ShoppingCart size={22} strokeWidth={1.3} />
        <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 bg-green-400 text-white text-xs font-bold rounded-full translate-x-1/2 -translate-y-1/2">
          {cartCount}
        </span>
      </div>
    </Link>
  );
}
