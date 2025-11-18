import 'dotenv/config'
import { getRecipe, listRecipes } from "@/lib/recipes";
import { PrismaClient } from "../prisma/generated/client";

const prisma = new PrismaClient();

async function main() {

    const recipeIds = await listRecipes();

    if (recipeIds === false) {
        console.log('Cant fetch recipes');
        return;
    }

    let i = 0;
    for await (const recipe_id of recipeIds) {

        i = i + 1;

        const gw2Recipe = await getRecipe(recipe_id as number);

        const disciplines = [];

        for await (const discipline_name of gw2Recipe.disciplines ?? []) {
            const discipline = await prisma.discipline.upsert({
                where: { name: discipline_name },
                update: {},
                create: { name: discipline_name }
            })
        }

        console.log(`[${i} / ${recipeIds.length}][NEW RECIPE] ${gw2Recipe.chat_link}`);
        break;
    }

}

main()
    .then(() => console.log('success'))
    .catch((err) => console.log(err))
    .finally(() => prisma.$disconnect())