import { PrismaClient } from "@/prisma/prisma/generated/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

type Context = {
    params: {
        item_id: number
    }
}

async function getRecipeTree(recipeId: number, depth = 0, maxDepth = 5) {
    if (depth > maxDepth) return null;

    const recipe = await prisma.recipe.findUnique({
        where: { id: recipeId },
        include: {
            output_item: true,
            ingredients: {
                include: { item: { include: {
                    bank: true, rarity: true
                } } }
            },
            disciplines: {
                include: { discipline: true }
            }
        }
    });

    if (!recipe) return null;

    // Pobierz dzieci (receptury składników)
    const children = [];
    for (const ing of recipe.ingredients) {
        const childRecipe = await prisma.recipe.findFirst({
            where: { output_item_id: ing.item_id }
        });

        if (childRecipe) {
            children.push(await getRecipeTree(childRecipe.id, depth + 1, maxDepth));
        } else {
            children.push(null);
        }
    }

    return {
        recipe,
        children
    };
}

export const GET = async (req: NextRequest, ctx: Context) => {

    const params = await ctx.params;

    const recipe = await prisma.recipe.findFirst({
        where: { output_item_id: parseInt(params.item_id.toString()) }
    })

    if (recipe === null) {
        return NextResponse.json({
            error: true,
            message: `Not found item with id ${params.item_id}`
        }, { status: 404 })
    }

    const recipeTree = await getRecipeTree(recipe.id);


    return NextResponse.json(recipeTree)
}