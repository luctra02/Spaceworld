"use client"; 

import DisplayGames from "@/components/DisplayGames";
import { useSession } from "next-auth/react";

export default function FavoritesPage() {
    const { data: session } = useSession();
    return (
        <main className="flex min-h-screen flex-col p-24 prose prose-invert lg:prose-xl max-w-full">
            {session ? (
                <>
                    <h2 className="mt-20">Here are your favorite games</h2>
                    <DisplayGames favorites={true} cardsPerPage={12} />
                </>
            ) : (
                <h2 className="mt-20">
                    You need to be logged in first to view your favorite games!
                </h2>
            )}
        </main>
    );
}
