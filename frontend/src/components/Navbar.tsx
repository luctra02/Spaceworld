"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SearchBar from "./Searchbar";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-x-neutral-600 p-5">
      <div className="flex items-center">
        {/* Container for the left side buttons */}
        <div className="flex gap-8 flex-grow">
          <Link href="/">
            <Button>Home</Button>
          </Link>

          <Link href="/favorites">
            <Button>Favorites</Button>
          </Link>
        </div>

        {/* Container for the search bar */}
        <div className="flex-shrink-0 ml-auto">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}
