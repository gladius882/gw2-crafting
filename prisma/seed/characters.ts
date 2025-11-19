import "dotenv/config"
import { PrismaClient } from "../prisma/generated/client"
import { getCharacter, listCharacters } from "@/lib/characters";

const prisma = new PrismaClient();

async function main() {

    const characterNames = await listCharacters();

    for (const character_name of characterNames) {

        const gw2Character = await getCharacter(character_name);

        const result = await prisma.character.upsert({
            where: { name: gw2Character.name },
            update: {
                level: gw2Character.level,
                age: gw2Character.age,
                deaths: gw2Character.deaths,
            },
            create: {
                gender: gw2Character.gender,
                name: gw2Character.name,
                age: gw2Character.age,
                deaths: gw2Character.deaths,
                level: gw2Character.level,
                race: {
                    connectOrCreate: {
                        where: { name: gw2Character.race },
                        create: { name: gw2Character.race }
                    }
                }
            }
        })

        console.log(`[NEW CHARACTER] ${result.name}`)
    }

}

main()
    .then(() => console.log('success'))
    .catch((err) => console.log(err))
    .finally(() => prisma.$disconnect())