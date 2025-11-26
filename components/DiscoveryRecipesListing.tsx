"use client"

import { Discipline, Rarity } from "@/prisma/prisma/generated/client"
import { useState } from "react"

type Props = {
    disciplines: Discipline[],
    rarities: Rarity[]
}

export default function DiscoveryRecipesListing(props: Props) {

    const [recipes, setRecipes] = useState([])

    const handleSearchClick = () => {

    }

    return (
        <div className="w-full flex flex-col gap-5">

            <div className="grid grid-cols-2 gap-x-10 gap-y-2">
                <div>
                    <div>Discipline</div>
                    <select className="w-full p-2 bg-black">
                        <option value={0}>Any</option>
                        {props.disciplines.map(d => {
                            return (
                                <option key={d.id} value={d.name}>
                                    {d.name}
                                </option>
                            )
                        })}
                    </select>
                </div>

                <div>
                    <div>Rarity</div>
                    <select className="w-full p-2 bg-black">
                        <option>Any</option>
                        {props.rarities.map(r => {
                            return <option key={r.id} value={r.name} style={{
                                color: r.color
                            }}>{r.name}</option>
                        })}
                    </select>
                </div>

                <div>
                    <div>Min rating</div>
                    <input type="number" defaultValue={0} min={0} max={500} className="px-2 border border-white w-full" />
                </div>

                <div>
                    <div>Max rating</div>
                    <input type="number" defaultValue={500} min={0} max={500} className="px-2 border border-white w-full" />
                </div>

                <div>
                    <div>Sort by</div>
                    <select className="w-full p-2 bg-black">
                        <option value="">Minimal rating</option>
                        <option value="">Discipline</option>
                        <option value="">Item name</option>
                    </select>
                </div>

                <div>
                    <div>Sort order</div>
                    <select className="w-full p-2 bg-black">
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>

                <div>
                    <div>Find in item name</div>
                    <input type="text" className="p-2 border border-white w-full" />
                </div>
            </div>

            <div>
                <button className="p-2 border border-white rounded-md" onClick={() => handleSearchClick()}>
                    Find undiscovered recipes
                </button>
            </div>

            {recipes.length === 0 && (
                <div>
                    No recipes
                </div>
            )}

            {recipes.map(item => {
                return (
                    <div key={item.id} className="flex gap-5 mb-5">
                        <div>
                            <img className="w-14 h-14" src={item.icon} alt={item.name} />
                        </div>

                        <div>
                            <div>
                                <a href={`/crafting/${item.id}`}>
                                    <span style={{
                                        color: item.rarity.color
                                    }}>{item.name}</span> ({item.min_rating})
                                </a>
                            </div>

                            <div className="flex gap-5">
                                {item.disciplines.map(d => {
                                    return (
                                        <div key={d.discipline.id} className="flex items-center">
                                            {d.discipline.icon && (
                                                <img src={d.discipline.icon} alt={d.discipline.name} className="w-8 h-8" />
                                            )}
                                            {d.discipline.name}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}