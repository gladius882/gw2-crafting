import "dotenv/config"
import { PrismaClient } from "../prisma/generated/client"
import { listMaterials } from "@/lib/account";

const prisma = new PrismaClient();

export async function seedMaterials() {

    const materials = await listMaterials();

    await prisma.bankMaterial.updateMany({
        data: { count: 0 }
    })


    for await (const material of materials) {
        
        const item = await prisma.item.findFirst({
            where: { gw2_id: material.id }
        })

        if(!item) {
            console.log(`[SKIP] Not found item with gw_id = ${material.id}`)
            continue;
        }

        const result = await prisma.bankMaterial.upsert({
            where: { item_id: item.id },
            update: { count: material.count },
            create: {
                count: material.count,
                item_id: item.id
            }
        })

        console.log(`Updated count in materials bank for item ${item.name}`);
    }

}

seedMaterials()
    .then(() => console.log('success'))
    .catch(console.log)
    .finally(() => prisma.$disconnect)