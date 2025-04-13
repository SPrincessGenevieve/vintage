import UserDropdown from "./user-dropdown";
import LogoAndGreetings from "./logo-and-greeting";
import NotificationDropdown from "./norification-drop-down";
import MobileNavigation from "./mobile-navigation";
import ContactDialog from "./contact-dialog";
import CartLink from "./cart-link";

export default function Header() {
  return (
    <header className="flex bg-white items-center px-2 z-10 border-b">
      {/* Only shown on mobile */}
      <MobileNavigation />
      {/* Logo and Greetings */}
      <div className="item-start">
        <LogoAndGreetings />
      </div>
      <div className="ml-auto flex items-center gap-5">
        {/* Notification Dropdown */}
        <NotificationDropdown />
        {/* Cart Link */}
        <CartLink />
        {/* User Dropdown */}
        <UserDropdown />
      </div>
    </header>
  );
}
