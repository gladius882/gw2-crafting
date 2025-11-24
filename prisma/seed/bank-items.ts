import { listBankItems } from "@/lib/account";
import { PrismaClient } from "../prisma/generated/client"

const prisma = new PrismaClient();

async function seedBankItems() {

    const bankItems = await listBankItems();

    for await (const bankItem of bankItems) {

        if(bankItem === null) continue;

        const item = await prisma.item.findFirst({
            where: { gw2_id: bankItem.id }
        })

        if(!item) {
            console.log(`[SKIP] Item with id = ${bankItem.id} not found`)
            continue;
        }

        await prisma.bankItem.upsert({
            where: { item_id: item.id },
            update: { count: bankItem.count },
            create: {
                count: bankItem.count,
                item_id: item.id
            }
        })

        console.log(`Updated item ${item.name}`);
    }
}

seedBankItems()
    .then(() => console.log('success'))
    .catch(console.log)
    .finally(() => prisma.$disconnect())