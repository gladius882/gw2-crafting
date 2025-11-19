import 'dotenv/config'
import { getRecipe, listRecipes } from "@/lib/recipes";
import { PrismaClient } from "../prisma/generated/client";
import { getItem } from '@/lib/items';

const prisma = new PrismaClient();

async function main() {

    const recipeIds = await listRecipes();

    if (recipeIds === false) {
        console.log('Cant fetch recipes');
        return;
    }

    let i = 0;
    for await (const recipe_id of recipeIds) {

        i = i + 1;

        if (i <= 12432) continue;

        const gw2Recipe = await getRecipe(recipe_id as number);

        const output_item = await prisma.item.findFirst({
            where: { gw2_id: gw2Recipe.output_item_id }
        })

        if(!output_item) {
            console.log(`[SKIP] Not found item with id #${gw2Recipe.output_item_id}`);
            continue;
        }

        const disciplines = [];

        for await (const discipline_name of gw2Recipe.disciplines ?? []) {
            const discipline = await prisma.discipline.upsert({
                where: { name: discipline_name },
                update: {},
                create: { name: discipline_name }
            })
            disciplines.push(discipline);
        }

        for await (const i of (gw2Recipe.ingredients ?? []).concat([{ item_id: gw2Recipe.output_item_id }])) {
            const item = await prisma.item.findFirst({
                where: { gw2_id: i.item_id }
            })

            if (!item) {
                const gw2Item = await getItem(i.item_id as number);

                if (!gw2Item.id) {
                    console.log(gw2Recipe);
                    console.log(gw2Item);
                    continue;
                }

                console.log(gw2Recipe);
                console.log(gw2Item);

                await prisma.item.create({
                    data: {
                        gw2_id: i.item_id,
                        name: gw2Item.name,
                        type: gw2Item.type,
                        chat_link: gw2Item.chat_link,
                        icon: gw2Item.icon,
                        level: gw2Item.level,
                        vendor_value: gw2Item.vendor_value,
                        rarity: {
                            connect: { name: gw2Item.rarity }
                        }
                    }
                })
            }
        }

        const result = await prisma.recipe.upsert({
            where: { gw2_id: gw2Recipe.id },
            update: {},
            create: {
                type: gw2Recipe.type,
                min_rating: gw2Recipe.min_rating,
                output_item_count: gw2Recipe.output_item_count,
                output_item: { connect: { gw2_id: gw2Recipe.output_item_id } },
                ingredients: {
                    create: gw2Recipe.ingredients.map(i => {
                        return {
                            item: {
                                connect: { gw2_id: i.item_id }
                            },
                            count: i.count
                        }
                    })
                },
                disciplines: {
                    create: disciplines.map(d => {
                        return {
                            discipline: {
                                connect: { name: d.name }
                            }
                        }
                    })
                },
                gw2_id: gw2Recipe.id
            }
        });

        console.log(`[${i} / ${recipeIds.length}][NEW RECIPE] ${result.gw2_id} ${output_item?.name}`);
    }

}

main()
    .then(() => console.log('success'))
    .catch((err) => console.log(err))
    .finally(() => prisma.$disconnect())