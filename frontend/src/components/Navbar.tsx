"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SearchBar from "./Searchbar";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
    const { data: session } = useSession();

    console.log(session);
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
                {!session ? (
                    <Link href="/api/auth/signin" className="ml-6">
                        <Button>Log in</Button>
                    </Link>
                ) : (
                    <div className="ml-6 flex items-center gap-4">
                        {session?.user?.picture && (
                            <Image
                                src={session.user.picture}
                                alt="User Profile"
                                width={32}
                                height={32}
                                className="rounded-full"
                            />
                        )}

                        <Link href="/api/auth/signout">
                            <Button>Sign out</Button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
