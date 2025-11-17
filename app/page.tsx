"use server"

import { getItem, listItems } from "@/lib/items";
import { getMaterial, listMaterialIds } from "@/lib/materials";
import { listRecipes } from "@/lib/recipes";

export default async function Home() {

  const recipes = await listRecipes();


  return (
    <div className="">

      <div>
        {JSON.stringify(recipes)}
      </div>

      
    </div>
  );
}
