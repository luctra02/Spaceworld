export async function GET() {
    const clientId = process.env.IGDB_CLIENT_ID;
    const accessToken = process.env.IGDB_ACCESS_TOKEN;

    const currentTime = Math.floor(Date.now() / 1000);
    const nextWeekTime = currentTime + 604800;

    if (!clientId || !accessToken) {
        return new Response(
            JSON.stringify({
                error: "Missing required environment variables.",
            }),
            { status: 500 },
        );
    }

    try {
        // Fetch data with pagination parameters
        const response = await fetch(
            `https://api.igdb.com/v4/games`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Client-ID": clientId,
                    Authorization: `Bearer ${accessToken}`,
                },
                body: `fields name, artworks.image_id, url, first_release_date, summary, genres.name, total_rating, total_rating_count, cover.image_id; 
                where artworks.image_id != null & first_release_date >= ${currentTime} & first_release_date <= ${nextWeekTime};
                sort first_release_date desc;`,
            },
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Fetched ${data.length} games from IGDB`);

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error("Failed to fetch data from IGDB API:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch data." }),
            {
                status: 500,
            },
        );
    }
}
