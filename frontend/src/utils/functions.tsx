const fetchGames = async () => {
  const clientId = process.env.NEXT_PUBLIC_IGDB_CLIENT_ID;
  const accessToken = process.env.NEXT_PUBLIC_IGDB_ACCESS_TOKEN;

  if (!clientId || !accessToken) {
    console.error(
      "Missing IGDB credentials. Please check your environment variables."
    );
    return;
  }

  try {
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Client-ID": clientId,
        Authorization: `Bearer ${accessToken}`,
      },
      // Fetch the game ID, name, and cover image URL
      body: `fields id, name, cover.url; limit 10;`, // Adjust the fields based on your needs
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data from IGDB API:", error);
    return null; // Return null if an error occurs
  }
};

export { fetchGames };
