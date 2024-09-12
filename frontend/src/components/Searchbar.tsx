"use client"; // Ensure this is added at the very top

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Ensure you use the new Next.js 13 router

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter(); // Use the router for client-side navigation

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search games..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearch} // Triggers search when "Enter" is pressed
        className="border p-2 rounded w-60"
      />
    </div>
  );
};

export default SearchBar;
