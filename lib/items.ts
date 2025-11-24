"use server"

import "dotenv/config"
import { gw2fetch } from "./client"
import { PrismaClient } from "@/prisma/prisma/generated/client";

export async function listItems() {
    return await gw2fetch('items');
}

export async function getItem(id: number) {
    return await gw2fetch(`items/${id}`)
}

export async function getWishlistedItems() {
    const prisma = new PrismaClient();

    try {
        return await prisma.item.findMany({
            where: { is_wishlised: true }
        })
    }
    catch {}
    finally {
        prisma.$disconnect();
    }
}