export async function GET(request: Request) {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "12");

    const clientId = process.env.IGDB_CLIENT_ID;
    const accessToken = process.env.IGDB_ACCESS_TOKEN;
    const corsProxyUrl = process.env.CORS_PROXY_URL;

    if (!clientId || !accessToken || !corsProxyUrl) {
        return new Response(
            JSON.stringify({
                error: "Missing required environment variables.",
            }),
            { status: 500 },
        );
    }

    try {
        // Calculate offset based on page number and page size
        const offset = (page - 1) * pageSize;

        // Fetch data with pagination parameters
        const response = await fetch(
            `${corsProxyUrl}/https://api.igdb.com/v4/games`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Client-ID": clientId,
                    Authorization: `Bearer ${accessToken}`,
                },
                body: `fields name, total_rating, total_rating_count, cover.image_id, url; 
        where cover.url != null & total_rating_count >= 100; 
        limit ${pageSize}; offset ${offset}; 
        sort total_rating desc;`,
            },
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(
            `Fetched ${data.length} games from IGDB with limit ${pageSize} and offset ${offset}`,
        );

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
