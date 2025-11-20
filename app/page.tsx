"use server"

import { getBankMaterials } from "@/lib/materials";
import Image from "next/image";

export default async function Home() {

  const bank = await getBankMaterials();


  return (
    <div className="grid grid-cols-2 gap-3">

        

      
    </div>
  );
}
