const fetchGames = async (page: number, pageSize: number) => {
  try {
    const response = await fetch(
      `/api/fetchGames?page=${page}&pageSize=${pageSize}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data from server:", error);
  }
};

const fetchSearchedGames = async (
  page: number,
  pageSize: number,
  search: string
) => {
  try {
    const response = await fetch(
      `/api/fetchSearchedGames?search=${search}&page=${page}&pageSize=${pageSize}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data from server:", error);
  }
};

export { fetchGames, fetchSearchedGames };
