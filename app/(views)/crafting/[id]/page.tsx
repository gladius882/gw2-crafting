"use server"

import { ItemCraftingTree } from "@/components/ItemCraftingTree";

export default async function CraftingPage(props: PageProps<'/crafting/[id]'>) {

    const params = await props.params;
    const res = await fetch(`http://localhost:3000/api/crafting/${params.id}`);
    const tree = await res.json();

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Crafting tree</h1>
            <ItemCraftingTree node={tree} />
        </div>
    )
}