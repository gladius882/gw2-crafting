"use server"

import { gw2fetch } from "./client"

export async function listItems() {
    return await gw2fetch('items');
}

export async function getItem(id: number) {
    return await gw2fetch(`items/${id}`)
}