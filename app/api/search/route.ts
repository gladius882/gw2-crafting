import { PrismaClient } from "@/prisma/prisma/generated/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();


export const GET = async (req: NextRequest, ctx: any) => {

    const context = await ctx;

    return NextResponse.json({
        ctx: context
    })
}