"use server"

import { getItem, listItems } from "@/lib/items";
import { getBankMaterials, getMaterial, listMaterialIds } from "@/lib/materials";
import { listRecipes } from "@/lib/recipes";
import Image from "next/image";

export default async function Home() {

  const bank = await getBankMaterials();


  return (
    <div className="grid grid-cols-10 gap-3">

      {bank.map(b => {
        return (
          <div key={b.id} className="shadow-white shadow text-center flex flex-col items-center justify-center p-2">
            <Image src={b.item.icon} alt="test" width={50} height={50} />
            <div>{b.count}</div>
          </div>
        )
      })}

      
    </div>
  );
}
