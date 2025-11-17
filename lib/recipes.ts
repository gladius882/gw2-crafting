"use server"

import { gw2fetch } from "./client"

export async function listRecipes() {
    return await gw2fetch('recipes');
}