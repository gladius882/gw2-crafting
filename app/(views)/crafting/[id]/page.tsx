"use server"

import { ItemCraftingTree } from "@/components/ItemCraftingTree";
import { wikiFetch } from "@/lib/client";
import { PrismaClient } from "@/prisma/prisma/generated/client";

export default async function CraftingPage(props: PageProps<'/crafting/[id]'>) {

    const prisma = new PrismaClient();

    const params = await props.params;
    const res = await fetch(`http://localhost:3000/api/crafting/${params.id}`);
    const tree = await res.json();

    const item = await prisma.item.findFirst({
        where: { id: parseInt(params.id.toString()) }
    })

    const wiki = await wikiFetch(item?.name || "");

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Crafting tree</h1>

            {/* {wiki && (
                <div dangerouslySetInnerHTML={{ __html: wiki.parse.text['*'] }} />
            )} */}

            <ItemCraftingTree node={tree} />
        </div>
    )
}