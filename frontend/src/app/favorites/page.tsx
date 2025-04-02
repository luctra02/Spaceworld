"use client";

import DisplayGames from "@/components/DisplayGames";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
    const { data: session, status } = useSession();
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (session?.user?.userId) {
                const response = await fetch(
                    `https://spaceworld.fly.dev/v1/api/users/username/${session.user.userId}`,
                );
                const username = await response.text();
                setUsername(username);
            }
        };
        fetchData();
    }, [session]);

    if (status === "loading") {
        return <></>;
    }

    return (
        <main className="flex min-h-screen flex-col p-24 prose prose-invert lg:prose-xl max-w-full">
            {session ? (
                <>
                    <h3>
                        Welcome back {username}, here are your favorite games
                    </h3>
                    <DisplayGames favorites={true} cardsPerPage={12} />
                </>
            ) : (
                <h2>
                    You need to be logged in first to view your favorite games!
                </h2>
            )}
        </main>
    );
}
