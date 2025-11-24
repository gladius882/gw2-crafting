"use client"

import ItemTile from "@/components/common/ItemTile";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function CraftingPage() {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const { id } = useParams();


    useEffect(() => {
        fetch(`/api/crafting/${id}`)
            .then((data) => {
                data.json().then((json) => setData(json))
            })
            .catch(console.log)
            .finally(() => setIsLoading(false))
    }, [id])


    if (isLoading) return (
        <div>
            Loading...
        </div>
    )

    if(!data) return (
        <div>
            Error :(
        </div>
    )

    return (
        <div>
            <h1>Crafting details</h1>

            <div className="flex gap-5 mb-10">
                <img src={data.output_item.icon} alt={data.output_item.name} />
                <div>
                    <div>{data.output_item.name}</div>
                    <div>{data.output_item.rarity.name}</div>
                </div>
            </div>

            <div>

                <h2>Ingredients</h2>
                {data?.ingredients?.map(item => {
                    return (
                        <div key={item.id} className="flex gap-5 item-center">
                            <div>
                                <img src={item.icon} alt={item.name} />
                            </div>
                            <div>{item.count}x</div>
                            <div>
                                {item.name}<br/>
                                {item.rarity?.name}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}