import { seedMaterials } from "@/prisma/seed/materials";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const PATCH = async (req: NextApiRequest) => {
    await seedMaterials();

    return NextResponse.json({})
}