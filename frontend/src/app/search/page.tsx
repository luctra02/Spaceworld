"use client"; // Ensure this is at the top

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DisplayGames from "@/components/DisplayGames";

const SearchResults = () => {
  const searchParams = useSearchParams(); // Use searchParams for query parameters
  const query = searchParams.get("query") || false; // Get the query from the URL
  const [games, setGames] = useState([]);

  return (
    <main className="flex min-h-screen flex-col p-24 prose prose-invert lg:prose-xl max-w-full">
      <h3 className="text-white mt-7">
        Search Results for:
        {query ? ` ${query}` : " No query provided"}
      </h3>
      <DisplayGames
        totalCards={1}
        cardsPerPage={9}
        search={encodeURIComponent(query)}
      />
    </main>
  );
};

export default SearchResults;