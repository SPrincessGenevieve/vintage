import AuthGridImages from "../../components/auth/auth-grid-images";
import AuthHeader from "@/components/auth/auth-header";
import './../globals.css'


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full grid grid-cols-1 md:grid-cols-2">
      {/* Auth Image */}
      <div className="h-full">
        <AuthGridImages />
      </div>

      {/* Pages */}
      <div className="flex flex-col h-full items-center">
        <AuthHeader />
        {/* <div className="bg-orange-400 mt-20 flex h-full">{children}</div> */}
        <div className="mt-20 flex justify-center h-full w-[90%] input-group p-4">{children}</div>
      </div>
    </div>
  );
}
