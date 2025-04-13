import { Button } from "../ui/button";
import type { NotificationCardT } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function NotificationCard({
  image,
  title,
  desc,
  date,
  price,
}: NotificationCardT) {
  return (
    <div className={`flex item-center gap-4 p-4 rounded-lg`}>
      <Image
        width={400}
        height={400}
        src={image}
        alt=""
        style={{ width: "auto", height: 80 }}
      />
      <div className="flex flex-col w-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-[10px] uppercase">{title}</h1>
          {price && (
            <p className="text-red-700 text-[10px]">Your price: {price}£</p>
          )}
        </div>
        <p className="font-light text-[9px] pt-2">{desc}</p>
        <div className="flex justify-between mt-auto items-end">
          <div className="flex gap-2 items-end mt-3">
            <Button
              size="sm"
              className="text-[10px] h-5 w-[40%] px-2 rounded-3xl"
            >
              Accept
            </Button>
            <Button
              size="sm"
              className="text-[10.5px] h-5 w-[40%] px-8 bg-red-800 hover:bg-red-900  rounded-3xl"
            >
              Reject
            </Button>
          </div>

          <p className="text-[10px] font-light">{date}</p>
        </div>
      </div>
    </div>
  );
}
