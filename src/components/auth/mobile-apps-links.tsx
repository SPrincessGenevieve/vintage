import Link from "next/link";
import Image from "next/image";
import AppStore from "@/images/app-store.png";
import GooglePlay from "@/images/google-play.png";

export default function MobileAppsLinks() {
  return (
    <div>
      <h5 className="text-center text-[12px]">We’re also available on</h5>
      <div className="flex items-center justify-center gap-5 mt-6">
        <Link href="#">
          <Image width={400} height={400} alt="app-store" src={AppStore} className="h-15" priority />
        </Link>
        <Link href="#">
          <Image  width={400} height={400} alt="google-play" src={GooglePlay} className="h-15" priority />
        </Link>
      </div>
    </div>
  );
}
