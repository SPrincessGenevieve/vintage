import { StatisticMockProp } from "@/lib/types";
import Image from "next/image";

export default function ChartStatisticsCard({
  item,
}: {
  item: StatisticMockProp;
}) {
  return (
    <div className="bg-[#F4F6F8] rounded-2xl flex items-center p-2">
      <div className="w-full flex flex-col">
        <div className="">
          <Image className="w-auto h-[30px]" src={item.icon} alt=""></Image>
        </div>
        <div>
          <p className="text-muted-foreground  text-[12px]">{item.title}</p>
          <p className={`gen-text-s text-[12px] text-[${item.color}]`}>{item.subtitle}</p>
        </div>
      </div>
    </div>
  );
}
