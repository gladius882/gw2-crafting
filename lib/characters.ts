import { gw2fetch } from "./client";

export async function listCharacters() {
    return await gw2fetch('characters');
}

export async function getCharacter(name: string) {
    return await gw2fetch(`characters/${name}`)
}