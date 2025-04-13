import LoadingDot from "@/images/loaddot";

export default function Loading() {
  return (
    <div className="absolute w-full h-full flex flex-col items-center justify-center">
      <div className="w-[100px] h-[100px]">
        <LoadingDot></LoadingDot>
      </div>
      <p>Loading data...</p>
    </div>
  );
}
