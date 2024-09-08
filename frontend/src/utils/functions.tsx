const fetchGames = async () => {
  try {
    const response = await fetch("/api/fetchGames");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data from server:", error);
  }
};

export default fetchGames;
