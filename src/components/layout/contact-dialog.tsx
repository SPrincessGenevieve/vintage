import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleHelp } from "lucide-react";
import ContactUser from "@/images/contact-user.jpg";
import Image from "next/image";
import ContactForm from "./contact-form";
import VintageIcon from "@/app/favicon.ico";

export default function ContactDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <span className="flex p-2">
          <CircleHelp size={22} strokeWidth={1.3} />{" "}
          <p className="text-[12px] pl-2">Contact Support</p>
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-screen-md">
        <DialogHeader>
          <DialogTitle className="text-[16px] font-normal">
          Contact the Support Desk
          </DialogTitle>
          {/* <DialogDescription className="text-[12px]">
            Choose between the set up debit or new bank account.
          </DialogDescription> */}
        </DialogHeader>
        <div className="flex gap-8 mt-5">
          {/* <div className="flex items-center gap-2">
            <div className="w-[50px] h-[50px] flex rounded-full border p-2">
              <Image
                src={VintageIcon}
                width={400}
                height={400}
                alt="contact-user"
                className="object-fill w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-[14px]">George Mottram</h1>
              <span className="text-muted-foreground text-[11px]">
                Vintage associates account manager
              </span>
            </div>
          </div> */}
          {/* <div>
            <h1 className="text-[14px]">Tel #</h1>
            <span className="text-muted-foreground text-[11px]">
              0203 998 3486
            </span>
          </div> */}
          <div>
            <h1 className="text-[14px]">Email</h1>
            <span className="text-muted-foreground text-[11px]">
              support@vintage-associates.co.uk
            </span>
          </div>
        </div>
        <ContactForm />
      </DialogContent>
    </Dialog>
  );
}
