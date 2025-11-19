"use server"

import { PrismaClient } from "@/prisma/prisma/generated/client";
import { gw2fetch } from "./client";

export async function listMaterialIds() {

    return await gw2fetch('materials');
}

export async function getMaterial(id: number) {

    return await gw2fetch(`/materials/${id}`)
}

export async function getBankMaterials() {
    const prisma = new PrismaClient();

    const bankItems = await prisma.bankMaterial.findMany({
        include: {
            item: true
        },
    })

    prisma.$disconnect();

    return bankItems;
}