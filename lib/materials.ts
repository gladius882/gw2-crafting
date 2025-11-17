"use server"

import { gw2fetch } from "./client";

export async function listMaterialIds() {
    
    return await gw2fetch('materials');
}

export async function getMaterial(id: number) {

   return await gw2fetch(`/materials/${id}`)
}