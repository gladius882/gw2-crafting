"use server"

export default async function DiscoverPage() {

    const res = await fetch('http://localhost:3000/api/crafting/discover');
    const toDiscover = await res.json();

    return (
        <div>

            <h1 className="text-lg">Discover recipes</h1>

            {toDiscover.map(item => {
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