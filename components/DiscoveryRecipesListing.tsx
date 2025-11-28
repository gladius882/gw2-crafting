"use client"

import { Discipline, Rarity } from "@/prisma/prisma/generated/client"
import { useState } from "react"

type Props = {
    disciplines: Discipline[],
    rarities: Rarity[]
}

type DiscoveryFilters = {
    discipline?: string,
    rarity?: string,
    min_rating?: number,
    max_rating?: number,
    sort_by?: string,
    sort_order?: string,
    item?: string
}

export default function DiscoveryRecipesListing(props: Props) {

    const [isLoading, setIsLoading] = useState(false);
    const [recipes, setRecipes] = useState([])
    const [filters, setFilters] = useState<DiscoveryFilters>({
        discipline: "%",
        rarity: "%",
        min_rating: 0,
        max_rating: 500,
        sort_by: "min_rating",
        sort_order: "asc",
        item: "%"
    })

    const handleSearchClick = () => {
        setIsLoading(true)

        let params = '?limit=50000&';
        if(filters.discipline !== undefined) params += `discipline=${filters.discipline}&`;
        if(filters.rarity !== undefined) params += `rarity=${filters.rarity}&`;
        if(filters.min_rating !== undefined) params += `min_rating=${filters.min_rating}&`;
        if(filters.max_rating !== undefined) params += `max_rating=${filters.max_rating}&`;
        if(filters.sort_by !== undefined) params += `sort_by=${filters.sort_by}&`;
        if(filters.sort_order !== undefined) params += `sort_order=${filters.sort_order}&`;
        if(filters.item !== undefined) params += `item=${filters.item}`;

        console.log(params);
        console.log(`http://localhost:3000/api/crafting/discover${params}`);

        fetch(`http://localhost:3000/api/crafting/discover${params}`, {
            cache: "no-cache"
        })
            .then((data) => {
                data.json()
                    .then((data) => setRecipes(data.data))
            })
            .catch((err) => {
                console.log(err);
                alert('error');
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <div className="w-full flex flex-col gap-5">

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-2">
                <div>
                    <div>Discipline</div>
                    <select className="w-full p-2 bg-black" value={filters.discipline} onChange={(event) => setFilters({ ...filters, discipline: event.target.value })}>
                        <option value="%">Any</option>
                        {props.disciplines.toSorted((a, b) => a.name.localeCompare(b.name)).map(d => {
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
                    <select className="w-full p-2 bg-black" value={filters.rarity} onChange={(event) => setFilters({ ...filters, rarity: event.target.value })}>
                        <option value="%">Any</option>
                        {props.rarities.map(r => {
                            return <option key={r.id} value={r.name} style={{
                                color: r.color
                            }}>{r.name}</option>
                        })}
                    </select>
                </div>

                <div>
                    <div>Min rating</div>
                    <input type="number"
                        value={filters.min_rating} 
                        min={0} max={500}
                        className="px-2 border border-white w-full"
                        onChange={(event) => setFilters({ ...filters, min_rating: parseInt(event.target.value) })}
                    />
                </div>

                <div>
                    <div>Max rating</div>
                    <input type="number"
                        defaultValue={filters.max_rating} 
                        min={0} max={500}
                        className="px-2 border border-white w-full"
                        onChange={(event) => setFilters({ ...filters, max_rating: parseInt(event.target.value) })}
                    />
                </div>

                <div>
                    <div>Sort by</div>
                    <select className="w-full p-2 bg-black" value={filters.sort_by} onChange={(event) => setFilters({ ...filters, sort_by: event.target.value })}>
                        <option value="min_rating">Minimal rating</option>
                        <option value="type">Item type</option>
                    </select>
                </div>

                <div>
                    <div>Sort order</div>
                    <select className="w-full p-2 bg-black" value={filters.sort_order} onChange={(event) => setFilters({ ...filters, sort_order: event.target.value })}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>

                <div>
                    <div>Find in item name</div>
                    <input type="text" 
                        value={filters.item}
                        className="p-2 border border-white w-full" 
                        onChange={(event) => setFilters({ ...filters, item: event.target.value })} 
                    />
                </div>
            </div>

            <div>
                <button className="p-2 border border-white rounded-md" onClick={() => handleSearchClick()}>
                    Find undiscovered recipes ({recipes.length})
                </button>
            </div>

            {recipes.length === 0 && (
                <div>
                    No recipes
                </div>
            )}

            {isLoading && (
                <div>Fetching data...</div>
            )}

            {recipes.map(item => {
                return (
                    <div key={item.disciplines[0].recipe_id} className="flex gap-5 mb-5">
                        <div>
                            <img className="w-14 h-14" src={item.icon} alt={item.name} />
                        </div>

                        <div>
                            <div>
                                <a href={`/crafting/${item.id}`}>
                                    <span style={{
                                        color: item.rarity.color
                                    }}>#{item.id} {item.name}</span> ({item.min_rating})
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