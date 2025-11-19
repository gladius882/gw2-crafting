"use server"

import { getBankMaterials } from "@/lib/materials";
import Image from "next/image";

export default async function Home() {

  const bank = await getBankMaterials();


  return (
    <div className="grid grid-cols-5 gap-3">

      {bank.map(b => {
        return (
          <div key={b.id} className="shadow-white shadow text-center flex flex-col items-center justify-center p-1">
            <Image src={b.item.icon} alt="test" width={70} height={70} className="border border-gray" />
            <div>{b.item.name}</div>
            <div>{b.count}</div>
          </div>
        )
      })}

      
    </div>
  );
}
