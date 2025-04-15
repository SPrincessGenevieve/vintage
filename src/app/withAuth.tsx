"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, ComponentType, useState } from "react";
import { useUserContext } from "@/app/context/UserContext";
import LoadingDot from "@/images/loaddot";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent } from "@/components/ui/dialog";
import SigninForm from "@/components/auth/sign-in-form";
import LogoVintage from "@/images/auth-header.png";
import Image from "next/image";
import AuthGridImages from "@/components/auth/auth-grid-images";
import AuthHeader from "@/components/auth/auth-header";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthWrapper = (props: P) => {
    const {
      sessionid,
      sessionkey,
      otp_verify,
      otp_validated,
      isLoggedIn,
      setUserDetails,
    } = useUserContext();
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [hide, setHide] = useState("hidden");

    useEffect(() => {
      const authenticateUser = async () => {
        try {
          // Check if user is authenticated
          if (isLoggedIn) {
            setIsAuthenticated(true);
          }
        } catch (error) {
          // router.push("/auth/sign-in");
        } finally {
          setLoading(false);
        }
      };
      // Only attempt authentication for protected routes (e.g., "/dashboard")
      if (pathname.startsWith("/dashboard")) {
        authenticateUser();
      } else {
        setLoading(false); // Skip authentication for non-protected routes
      }
    }, [pathname, isLoggedIn, router]);

    // If still loading, show a loading state
    if (loading) {
      return (
        <div className="absolute w-full h-full flex flex-col items-center justify-center">
          <div className="w-[100px] h-[100px]">
            <LoadingDot />
          </div>
          <p>Loading data...</p>
        </div>
      );
    }

    setTimeout(() => {
      setHide("");
    }, 1000);

    // If not authenticated, show the login screen (your custom div)
    if (!isAuthenticated) {
      return (
        <div
          className={`w-full h-full flex fixed top-0 z-50 left-0 bg-[white] ${hide}`}
        >
          <div className="h-full w-full grid grid-cols-1 md:grid-cols-2">
            {/* Auth Image */}
            <div className="h-full">
              <AuthGridImages />
            </div>

            {/* Pages */}
            <div className="w-full flex items-center justify-center">
              <div className="flex flex-col h-full justify-center w-[70%]">
                <AuthHeader />
                <SigninForm />
              </div>
            </div>
          </div>
        </div>
        // <div className="w-full h-full flex fixed top-0 z-50 left-0 bg-[white]">
        //   <SigninForm></SigninForm>
        // </div>
      );
    }

    // Render the protected component if authentication is valid
    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
};

export default withAuth;
