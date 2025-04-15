import Image from "next/image";
import favicon from "@/app/favicon.ico";
import { useUserContext } from "@/app/context/UserContext";
import { UserData } from "@/lib/data/user";

export default function LogoAndGreetings() {
  const userData = UserData
  return (
    <div className="flex h-12 justify-between items-center">
      <div className="flex items-center ml-2">
        <Image
          src={favicon}
          alt="logo"
          height={25}
          width={25}
          className="hidden md:block"
        />
        <h1 className="text-[16px] ml-5">Hi, {userData.first_name}!</h1>
      </div>
      <div className="flex items-center"></div>
    </div>
  );
}
