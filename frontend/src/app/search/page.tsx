"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import DisplayGames from "@/components/DisplayGames";

const SearchResults = () => {
    const [query, setQuery] = useState<string | false | null>(null);
    const searchParams = useSearchParams(); // Get search params only on client-side

    useEffect(() => {
        const queryValue = searchParams.get("query") || false;
        setQuery(queryValue);
    }, [searchParams]);

    if (query === null) {
        return <p>Loading search results...</p>; // Can add a Suspense boundary here if needed
    }

    return (
        <main className="flex min-h-screen flex-col p-24 prose prose-invert lg:prose-xl max-w-full">
            <h3 className="text-white mt-7">
                Search Results for:
                {query ? ` ${query}` : " No query provided"}
            </h3>
            {/* Suspense for search-related content */}
            <Suspense fallback={<p>Loading games...</p>}>
                <DisplayGames
                    cardsPerPage={12}
                    search={encodeURIComponent(query || "")}
                />
            </Suspense>
        </main>
    );
};

export default SearchResults;
