import { PrismaClient } from "@/prisma/prisma/generated/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {

    const undiscovered = await prisma.recipe.findMany({
        where: { 
            discovered: false,
            disciplines: {
                some: {
                    discipline: {
                        name: "Artificer"
                    }
                }
            }
        },
        include: {
            output_item: {
                include: {
                    rarity: true,
                }
            },
            disciplines: {
                include: {
                    discipline: true
                }
            }
        },
        take: 20,
        orderBy: {
            min_rating: "desc"
        }
    })




    return NextResponse.json(undiscovered.map((u) => {
        return {
            ...(u.output_item),
            min_rating: u.min_rating,
            disciplines: u.disciplines
        }
    }))
}