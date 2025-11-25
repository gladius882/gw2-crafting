import { gw2fetch } from "@/lib/client";
import { PrismaClient } from "../prisma/generated/client"

const prisma = new PrismaClient();

export async function getDiscoveredRecipes() {

    const response = await gw2fetch('characters/Katara%20Uwu/recipes');

    await prisma.recipe.updateMany({
        data: {
            discovered: false
        }
    })

    for await (const recipe_id of response.recipes) {

        await prisma.recipe.update({
            where: { gw2_id: recipe_id },
            data: {
                discovered: true
            }
        })
    }
}

getDiscoveredRecipes()
    .then(() => console.log('success'))
    .catch(console.log)
    .finally(() => prisma.$disconnect())