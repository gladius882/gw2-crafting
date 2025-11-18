import 'dotenv/config'
import { getRecipe, listRecipes } from "@/lib/recipes";
import { PrismaClient } from "../prisma/generated/client";

const prisma = new PrismaClient();

async function main() {

    const recipeIds = await listRecipes();

    if(recipeIds === false) {
        console.log('Cant fetch recipes');
        return;
    }

    for await (const recipe_id of recipeIds) {
        
        const gw2Recipe = await getRecipe(recipe_id as number);
        console.log(gw2Recipe);
        break;
    }

}

main()
    .then(() => console.log('success'))
    .catch((err) => console.log(err))
    .finally(() => prisma.$disconnect())