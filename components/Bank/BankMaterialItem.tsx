import { BankMaterial } from "@/types/BankMaterials"
import Image from "next/image"

type Props = {
    material: BankMaterial
}

export default function BankMaterialItem({ material }: Props) {
    return (
        <div key={material.id} className="shadow-white shadow text-center flex flex-col items-center justify-center p-1">
            <Image src={material.item.icon as string} alt={material.item.name} width={70} height={70} className="border border-gray" />
            <div>{material.item.name}</div>
            <div>{material.count}</div>
        </div>
    )
}