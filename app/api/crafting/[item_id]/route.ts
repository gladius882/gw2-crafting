import { PrismaClient } from "@/prisma/prisma/generated/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type Context = {
    params: {
        item_id: number
    }
}

export const GET = async (req: NextRequest, ctx: Context) => {

    const prisma = new PrismaClient();

    const recipe = await prisma.recipe.findFirst({
        where: { output_item_id: ctx.params.item_id },
        include: {
            disciplines: {
                include: {
                    discipline: true
                }
            },
            ingredients: {
                include: {
                    item: true
                }
            },
            output_item: true
        }
    })

    return NextResponse.json({
        output_item: {
            ...recipe?.output_item,
            count: recipe?.output_item_count,
            min_rating: recipe?.min_rating
        },
        ingredients: recipe?.ingredients.map(ingredient => {
            return {
                ...ingredient.item,
                count: ingredient.count,
            }
        }),
        disciplines: recipe?.disciplines.map(d => d.discipline.name)
    })
}