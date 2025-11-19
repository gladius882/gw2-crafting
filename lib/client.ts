export async function gw2fetch(endpoint: string) {
    return fetch(`${process.env.API_BASE_URL}/v2/${endpoint}?access_token=${process.env.API_KEY}`)
        .then(data => data.json())
        .catch((err) => {
            console.log(err);
            return false;
        })
}