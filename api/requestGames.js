export default async function getGamesSteam(req, res){
    if (req.method !== 'GET') {
        return res.status(405).json({ message: `Método ${req.method} não permitido` });
    }

    try {
        const response = await fetch('https://api.steampowered.com/ISteamApps/GetAppList/v2/');
        const data = await response.json();

        return res.status(200).json(data.applist.apps);
    } catch (error) {
        console.error('Erro ao buscar jogos da Steam:', error);
        return res.status(500).json({ error: 'Erro ao buscar jogos da Steam' });
    }
}