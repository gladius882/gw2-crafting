export interface Item {
    id: number
    name: string
    items?: number[]
    rarity_id: number
    chat_link: string | null
    icon?: string | null
}