"use server"

export default async function DiscoverPage() {

    const res = await fetch('http://localhost:3000/api/crafting/discover');
    const toDiscover = await res.json();

    return (
        <div>
            <div>
                {JSON.stringify(toDiscover[0])}
            </div>

            {toDiscover.map(item => {
                return (
                    <div key={item.id} className="flex gap-5 mb-5">
                        <div>
                            <img className="w-14 h-14" src={item.icon} alt={item.name} />
                        </div>

                        <div>
                            <div>
                                <a href={`/crafting/${item.id}`}>{item.name} ({item.min_rating})</a>
                            </div>

                            <div className="flex gap-5">
                                {item.disciplines.map(d => {
                                    return (
                                        <div key={d.discipline.id}>
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