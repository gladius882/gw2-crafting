"use server"

import BankMaterialItem from "@/components/Bank/BankMaterialItem";
import { getBankMaterials } from "@/lib/materials"
import Image from "next/image";

export default async function MaterialsPage() {
    const materials = await getBankMaterials();

    return (
        <div className="grid grid-cols-5 gap-3">

            {materials.map(b => {
                return <BankMaterialItem key={b.id} material={b} />
            })}


        </div>
    )
}