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
                        alt=""
                        className="w-6 h-6"
                    />
                    <span className="font-medium">{recipe.output_item?.name}</span>
                    <span className="text-xs text-gray-500">({recipe.ingredients.length} ingredients)</span>
                </div>
            )}
            
            <div className="ml-6 mt-1">
                {recipe.ingredients.map((ing, index) => (
                    <div key={index} className="mt-1">
                        <div className="flex gap-2 items-center text-sm">
                            <img src={ing.item.icon ?? ''} className="w-4 h-4" />
                            <span>{ing.item.name} × {ing.count}</span>
                            <span>{JSON.stringify(ing.item.rarity)}</span>
                        </div>

                        {children[index] && (
                            <ItemCraftingTree node={children[index]!} hide_base_item={true}/>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}