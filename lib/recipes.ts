"use server"

import { gw2fetch } from "./client"

export async function listRecipes() {
    return await gw2fetch('recipes');
}

export async function getRecipe(recipe_id: number) {
    return await gw2fetch(`recipes/${recipe_id}`);
}