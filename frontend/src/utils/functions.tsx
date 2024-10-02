const fetchGames = async (page: number, pageSize: number) => {
    try {
        const response = await fetch(
            `/api/fetchGames?page=${page}&pageSize=${pageSize}`,
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
    search: string,
): Promise<{ data: any; totalCount: number | null }> => {
    try {
        const response = await fetch(
            `/api/fetchSearchedGames?search=${search}&page=${page}&pageSize=${pageSize}`,
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const totalGames = response.headers.get("total-count");

        return {
            data,
            totalCount: totalGames ? parseInt(totalGames, 10) : null,
        };
    } catch (error) {
        console.error("Failed to fetch data from server:", error);
        return {
            data: [],
            totalCount: null,
        };
    }
};

const fetchUpcomingGames = async () => {
    try {
        const response = await fetch(`/api/fetchUpcomingGames`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch data from server:", error);
    }
};

export { fetchGames, fetchSearchedGames, fetchUpcomingGames };
