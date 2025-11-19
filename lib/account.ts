import { gw2fetch } from "./client";

export async function getAccount() {
    return await gw2fetch('account');
}

export async function listMaterials() {
    return await gw2fetch('account/materials');
}