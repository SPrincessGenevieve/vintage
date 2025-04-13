import Image from "next/image";
import Link from "next/link";
import Auth1 from "@/images/auth_1.jpg";
import Auth2 from "@/images/auth_2.jpg";
import Auth3 from "@/images/auth_3.png";
import Auth4 from "@/images/auth_4.jpg";
import Auth2Layover from "@/images/auth-2-layover.png";
import "@/app/globals.css"

export default function AuthGridImages() {
  return (
    <div className="grid grid-cols-2 h-full min-h-screen gap-2 p-4 pb-8  grid-images">
      <div className="w-50">
        <div
          className="h-[40%] relative mb-2 rounded-tl-xl  rounded-br-xl"
          style={{
            backgroundImage: `url(${Auth1.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div
          className="bg-[#104144] p-4 pl-8 h-[30%] relative mb-2 rounded-tr-xl rounded-br-xl text-white group"
        >
          {/* When hover this disappears */}
          <div className="max-w-80 pt-14 group-hover:hidden">
            <h1 className="text-3xl tracking-wider ">500+</h1>
            <p className="text-[16px] pt-3 font-light">
              Chosen wines to invest.
            </p>
            <p className="pt-10">
              <Link className="underline text-[16px]" href="/about-us">
                About us
              </Link>
            </p>
          </div>
          {/* When hover this reveals */}
          <div className="max-w-80 pt-14 opacity-0 group-hover:opacity-100 group-hover:block hidden">
            <h1 className="text-3xl tracking-wider">Events</h1>
            <p className="text-[16px] pt-3 font-light">
              Exclusive tour events for clients.
            </p>
            <p className="pt-10">
              <Link className="underline text-[16px]" href="/about-us">
                About us
              </Link>
            </p>
          </div>
        </div>
        <div
          className="bg-[#121416] h-[30%] relative rounded-bl-xl rounded-tr-xl"
          style={{
            backgroundImage: `url(${Auth3.src})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
      <div className="w-50">
        <div
          className="h-[30%] relative mb-2 rounded-bl-xl"
          style={{
            backgroundImage: `url(${Auth2.src})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left bottom",
          }}
        >
          <div className="rounded-bl-xl w-full h-full bg-zinc-950 bg-opacity-50 flex items-center justify-center px-4">
            <Image src={Auth2Layover} alt={""}></Image>
          </div>
        </div>
        <div
          className="p-4 pl-8 bg-[#8D1B22] h-[30%] relative mb-2  rounded-tl-xl text-white
group"
        >
          {/* When hover this disappears */}
          <div className="max-w-80 pt-14 group-hover:hidden">
            <h1 className="text-3xl tracking-wider">5 levels</h1>
            <p className="text-[16px] pt-3 font-light">
              More investment, lower fees.
            </p>
            <p className="pt-10">
              <Link className="underline text-[16px]" href="/about-us">
                About us
              </Link>
            </p>
          </div>
          {/* When hover this reveals */}
          <div className="max-w-80 pt-14 opacity-0 group-hover:opacity-100 group-hover:block hidden">
            <h1 className="text-3xl tracking-wider">Insights</h1>
            <p className="text-[16px] pt-3 font-light">
              Exclusive insights articles only for clients.
            </p>
            <p className="pt-10">
              <Link className="underline text-[16px]" href="/about-us">
                About us
              </Link>
            </p>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${Auth4.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="h-[40%] relative mb-2 rounded-tl-xl"
        ></div>
      </div>
    </div>
  );
}
