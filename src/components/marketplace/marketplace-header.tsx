import Link from "next/link";
import { Badge } from "../ui/badge";
import { Workflow } from "lucide-react";
import InvestmentLevelSelect from "./investment-level-select";
import BagdeLevel from "../bagde-level";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import { useState } from "react";

export default function MarketplaceHeader() {
  const router = useRouter()
  const handleNext = () =>{
    setVisible(true)
    router.push('/dashboard/marketplace/portfolio-builder')
  }
  const [visible, setVisible] = useState(false)

  return (
    <div className="bg-white px-4 mr-2 py-2  w-[90%]">
      <Loading visible={visible}></Loading>
      <div className="flex justify-between">
        <div>
          <h1 className="font-semibold text-[16px]">Marketplace</h1>
          {/* <p className="font-light text-[12px] text-muted-foreground">
            Browse all wines that we have.
          </p> */}
        
          <Button onClick={handleNext} className="bg-[#5856D6] text-white rounded-full flex items-center justify-center py-1.5 text-[12px] gap-2">
            <div className="flex gap-2">
              <Workflow size={15} />
              Portfolio builder
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
