import { PrismaClient } from "@/prisma/prisma/generated/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
    
    const prisma = new PrismaClient();

    const bankItems = await prisma.bankMaterial.findMany({
        include: {
            item: true
        },
        take: 1
    })

    prisma.$disconnect();

    return NextResponse.json(bankItems);
}