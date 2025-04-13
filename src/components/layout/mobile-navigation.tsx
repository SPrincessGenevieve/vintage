import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { links } from "./links";
import { AlignLeft } from "lucide-react";
import Link from "next/link";

export default function MobileNavigation() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 rounded-xl md:hidden"
        >
          <AlignLeft size={30} strokeWidth={1.3} />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col item-start w-[250px]">
        <SheetTitle>Image here</SheetTitle>
        <SheetDescription />
        <nav className="grid items-start text-sm font-medium">
          <div className="mt-2">
            {links.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className="flex items-center gap-2 hover:bg-muted rounded-md p-2"
              >
                {item.icon}
                <h1 className="text-md">{item.name}</h1>
              </Link>
            ))}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
