export async function gw2fetch(endpoint: string) {
    return fetch(`${process.env.API_BASE_URL}/v2/${endpoint}`, {
        method: "GET",
        headers: {
            "Authentication": `Bearer ${process.env.API_KEY}`
        }
    })
        .then(data => data.json())
        .catch(() => false)
}