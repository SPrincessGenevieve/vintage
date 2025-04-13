import { MessageSquare } from "lucide-react";
import './../../app/globals.css'

export default function Footer() {
  return (
    <footer className="fixed bottom-0 right-0 px-4 py-3 bg-primary rounded-tl-lg text-white text-sm bottom-foot">
      <div className="flex items-center bottom-feature">
        <MessageSquare className="mr-2" />
        Understanding the Fine Wine Market
      </div>
    </footer>
  );
}
