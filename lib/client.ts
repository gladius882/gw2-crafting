import "dotenv/config"

export async function gw2fetch(endpoint: string) {
    return fetch(`${process.env.API_BASE_URL}/v2/${endpoint}?access_token=${process.env.API_KEY}`)
        .then(data => data.json())
        .catch((err) => {
            console.log(err);
            return false;
        })
}

export async function wikiFetch(title: string) {

    const url = `https://wiki.guildwars2.com/api.php?action=parse&page=${title}&prop=text&format=json`;

    return fetch(url, {
        headers: {
            "User-Agent": "MyApp/1.0 (contact@example.com)"
        }
    })
        .then(data => {
            console.log(data);

            if (data.status === 403) return false;
            return data.json();
        })
        .catch((err) => {
            console.log(err);
            return false
        })
}