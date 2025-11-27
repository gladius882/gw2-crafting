"use server"

import DiscoveryRecipesListing from "@/components/DiscoveryRecipesListing";
import { PrismaClient } from "@/prisma/prisma/generated/client";

export default async function DiscoverPage() {

    const prisma = new PrismaClient();
    const disciplines = await prisma.discipline.findMany();
    const rarities = await prisma.rarity.findMany();

    return (
        <div>

            <h1 className="text-lg">Discover recipes</h1>

            <DiscoveryRecipesListing disciplines={disciplines} rarities={rarities} />
        </div>
    )
}