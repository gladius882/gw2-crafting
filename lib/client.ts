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
    return fetch(`https://wiki.guildwars2.com/api.php?action=parse&page=${title}&prop=text&format=json`)
        .then(data => data.json())
        .catch((err) => {
            console.log(err);
            return false
        })
}