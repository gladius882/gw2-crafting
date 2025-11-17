import 'dotenv/config'
import { getItem, listItems } from "@/lib/items";
import { PrismaClient } from "../prisma/generated/client";

const prisma = new PrismaClient();

async function main() {

    const ids = await listItems();

    if(ids === false) return;

    for await (const id of ids) {

        const gw2Item = await getItem(id as number);

        if(gw2Item === false) {
            continue;
        }

        const rarity = await prisma.rarity.findUnique({
            where: {
                name: gw2Item.rarity
            }
        })

        if(!rarity) {
            console.log(`No rarity ${gw2Item.rarity}`)
            continue;
        }

        const result = await prisma.item.upsert({
            where: { name: gw2Item.name },
            update: {},
            create: {
                name: gw2Item.name,
                order: gw2Item.order,
                rarity_id: rarity?.id,
                type: gw2Item.type,
                vendor_value: gw2Item.vendor_value,
                icon: gw2Item.icon,
                chat_link: gw2Item.chat_link,
                level: gw2Item.level
            }
        })

        console.log(`[NEW ITEM] ${result.name}`);
    }
}

main()  
    .then(() => console.log('success'))
    .catch(err => console.log(err))
    .finally(() => prisma.$disconnect())