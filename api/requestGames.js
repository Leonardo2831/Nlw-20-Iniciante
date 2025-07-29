// export default async function getGamesSteam(req, res){
//     if (req.method !== 'GET') {
//         return res.status(405).json({ message: `Método ${req.method} não permitido` });
//     }

//     try {
//         const response = await fetch('https://api.steampowered.com/ISteamApps/GetAppList/v2/');
//         const data = await response.json();

//         return res.status(200).json(data.applist.apps);
//     } catch (error) {
//         console.error('Erro ao buscar jogos da Steam:', error);
//         return res.status(500).json({ error: 'Erro ao buscar jogos da Steam' });
//     }
// }

export default async function getGamesSteam(req, res){
    if (req.method !== 'GET') {
        return res.status(405).json({ message: `Método ${req.method} não permitido` });
    }

    try {
        const response = await fetch('https://api.steampowered.com/ISteamApps/GetAppList/v2/');
        const { applist: { apps }} = await response.json();

        const gamePromises = apps.map(async (app) => {
            const detailsResponse = await fetch(`https://store.steampowered.com/api/appdetails?appids=${app.appid}`);
            const detailsData = await detailsResponse.json();

            const appData = detailsData[app.appid]?.data;
            const typePermitted = ['game', 'dlc'];
            if(typePermitted.includes(appData?.type)){
                return { name: app.name, appid: app.appid };
            }

            return null;
        });

        const gamesOnly = ((await Promise.all(gamePromises)).filter(Boolean));

        return res.status(200).json(gamesOnly);
    } catch (error) {
        console.error('Erro ao buscar jogos da Steam:', error);
        return res.status(500).json({ error: 'Erro ao buscar jogos da Steam' });
    }
}