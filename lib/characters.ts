import { gw2fetch } from "./client";

export async function listCharacters() {
    return await gw2fetch('characters');
}