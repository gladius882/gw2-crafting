'use client';

type RecipeNode = {
    recipe: any;
    children: (RecipeNode | null)[];
};

export function ItemCraftingTree({ node, hide_base_item }: { node: RecipeNode, hide_base_item?: boolean }) {
    if (!node) return null;

    const { recipe, children } = node;

    return (
        <div className="ml-4 mt-2 border-l pl-4">
            {!hide_base_item && (
                <div className="flex items-center gap-2">
                    <img
                        src={recipe.output_item?.icon ?? ''}
                        alt={recipe.output_item?.name ?? ''}
                        className="w-14 h-14"
                    />
                    <span className="font-medium" style={{
                        color: recipe.output_item.rarity.color
                    }}>{recipe.output_item?.name}</span>
                    <span className="text-xs text-gray-500">({recipe.ingredients.length} ingredients)</span>
                </div>
            )}

            <div className="ml-6 mt-1">
                {recipe.ingredients.map((ing, index) => (
                    <div key={index} className="mt-1">
                        <a href={`/crafting/${ing.item.id}`}>
                            <div className="flex gap-2 items-center text-sm">
                                <img src={ing.item.icon ?? ''} className="w-12 h-12" style={{
                                    borderWidth: '1px',
                                    borderColor: (ing.item.bank[0]?.count ?? 0) >= ing.count ? "green" : "red"
                                }} />
                                <span style={{
                                    color: ing.item.rarity.color
                                }}>{ing.item.name} × {ing.count}</span>

                                <span>{ing.item.bank[0]?.count ?? 0} / {ing.count}</span>
                            </div>
                        </a>

                        {children[index] && (
                            <ItemCraftingTree node={children[index]!} hide_base_item={true} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}