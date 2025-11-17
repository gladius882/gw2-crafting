import 'dotenv/config'
import { Rarity } from '@/types/Rarity'
import { PrismaClient } from '../prisma/generated/client';

const prisma = new PrismaClient()

const data: Omit<Rarity, "id">[] = [
    { name: "Junk" },
    { name: "Basic", min_level: 1, max_level: 80 },
    { name: "Fine", min_level: 1, max_level: 80 },
    { name: "Masterwork", min_level: 14, max_level: 80 },
    { name: "Rare", min_level: 30, max_level: 80 },
    { name: "Exotic", min_level: 62, max_level: 80 },
    { name: "Ascended", min_level: 80, max_level: 80 },
    { name: "Legendary", min_level: 80, max_level: 80 },
]

async function main() {

    for (const rarity of data) {

        const result = await prisma.rarity.upsert({
            where: { name: rarity.name },
            update: {},
            create: rarity,
        })

        console.log(result.id);
    }
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })