import { PrismaClient } from "@/prisma/prisma/generated/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {

    const params = {
        min_rating: req.nextUrl.searchParams.get('min_rating') ?? 0,
        max_rating: req.nextUrl.searchParams.get('max_rating') ?? 500,
        discipline_name: req.nextUrl.searchParams.get('discipline') ?? "%",
        rarity_name: req.nextUrl.searchParams.get('rarity') ?? "%",
        item_name: req.nextUrl.searchParams.get('item') ?? "%",
        sort_by: req.nextUrl.searchParams.get('sort_by') ?? "id",
        sort_order: req.nextUrl.searchParams.get('sort_order') ?? "asc",
        limit: req.nextUrl.searchParams.get('limit') ?? 20,
        offset: req.nextUrl.searchParams.get('offset') ?? 0,
    }

    const undiscovered = await prisma.recipe.findMany({
        where: {
            discovered: false,
            disciplines: {
                some: {
                    discipline: {
                        name: {
                            mode: "insensitive",
                            contains: params.discipline_name
                        }
                    }
                }
            },
            output_item: {
                name: {
                    mode: "insensitive",
                    contains: params.item_name
                },
                rarity: {
                    name: {
                        mode: "insensitive",
                        contains: params.rarity_name
                    }
                }
            },
            min_rating: {
                gt: parseInt(params.min_rating.toString()),
                lt: parseInt(params.max_rating.toString())
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
        take: parseInt(params.limit.toString()),
        skip: parseInt(params.offset.toString()),
        orderBy: {
            [params.sort_by]: params.sort_order
        }
    })

    return NextResponse.json({
        count: undiscovered.length,
        limit: params.limit,
        offset: params.offset,
        data: undiscovered.map((u) => {
            return {
                ...(u.output_item),
                min_rating: u.min_rating,
                disciplines: u.disciplines
            }
        })
    })
}