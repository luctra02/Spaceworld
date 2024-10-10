"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SearchBar from "./Searchbar";
import Login from "./Login";

export default function Navbar() {
    return (
        <nav className="w-full border-b border-x-neutral-600 p-5">
            <div className="flex items-center">
                <div className="flex gap-8 flex-grow">
                    <Link href="/">
                        <Button>Home</Button>
                    </Link>

                    <Link href="/favorites">
                        <Button>Favorites</Button>
                    </Link>
                </div>
                <div className="flex-shrink-0 ml-auto">
                    <SearchBar />
                </div>
                <Login />
            </div>
        </nav>
    );
}
