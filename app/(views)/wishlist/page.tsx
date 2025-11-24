import ItemTile from "@/components/common/ItemTile";
import { getWishlistedItems } from "@/lib/items"

export default async function WishlistPage() {

    const wishlistedItems = await getWishlistedItems();

    return (
        <div>

            <div>
                <h2>Wishlist</h2>
            </div>

            <div className="grid grid-cols-4 gap-2">
                {wishlistedItems?.map(item => {
                    return <ItemTile icon={item.icon as string} item_id={item.id} name={item.name} key={item.id}/>
                })}

                <button className="border border-white">
                    + Add next
                </button>
            </div>
            
        </div>
    )
}