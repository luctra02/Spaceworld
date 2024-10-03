"use client";

import React, { SVGProps, useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import Pagination from "@mui/material/Pagination";
import { fetchGames, fetchSearchedGames } from "../utils/functions";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";

type DisplayGamesProps = {
    totalCards?: number;
    cardsPerPage: number;
    search?: string | false;
};

interface Game {
    id: number;
    name: string;
    cover: {
        image_id: string;
    };
    url: string;
    total_rating: number;
    total_rating_count: number;
}

const DisplayGames: React.FC<DisplayGamesProps> = ({
    totalCards = 0,
    cardsPerPage,
    search = false,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [games, setGames] = useState<Game[]>([]);
    const [totalGames, setTotalGames] = useState<number | null>(totalCards);
    const [error, setError] = useState<string | null>(null);
    const [favoriteGames, setFavoriteGames] = useState<number[]>([]);
    const { data: session } = useSession();

    const fetchFavorites = async (userId: string) => {
        const response = await fetch(
            `http://localhost:8001/v1/api/favorites/${userId}`,
        );
        const favorites = await response.json();
        console.log("HERRRR§!!!!!!");
        console.log(favorites);
        return favorites.map((game: Game) => game.id); // Returning only game IDs
    };

    useEffect(() => {
        const fetchUserFavorites = async () => {
            if (session?.user?.userId) {
                // Check if the user is logged in
                const favoriteIds = await fetchFavorites(session.user.userId);
                setFavoriteGames(favoriteIds);
            } else {
                setFavoriteGames([]); // Clear favorite games if user is not logged in
            }
        };

        fetchUserFavorites();
    }, [session]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    useEffect(() => {
        const fetchData = async () => {
            if (search) {
                try {
                    const { data: fetchedGames, totalCount: totalCount } =
                        await fetchSearchedGames(
                            currentPage,
                            cardsPerPage,
                            search,
                        );
                    if (fetchedGames) {
                        setGames(fetchedGames);
                        setTotalGames(totalCount);
                    } else {
                        setError("No games found.");
                    }
                } catch (error) {
                    setError("Failed to fetch data from server.");
                }
            } else {
                try {
                    const fetchedGames = await fetchGames(
                        currentPage,
                        cardsPerPage,
                    );
                    if (fetchedGames) {
                        setGames(fetchedGames);
                    } else {
                        setError("No games found.");
                    }
                } catch (error) {
                    setError("Failed to fetch data from server.");
                }
            }
        };
        fetchData();
    }, [cardsPerPage, currentPage, search]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const totalPages =
        totalGames !== null
            ? Math.ceil(totalGames / cardsPerPage)
            : Math.ceil(totalCards / cardsPerPage);

    const handleFavorites = async (game: Game) => {
        // Expecting game to be of type Game
        if (!session) {
            // Show a message or redirect to login
            alert("You need to log in to add favorites.");
            return;
        }

        const isFavorite = favoriteGames.includes(game.id); // Check if the game is already favored

        try {
            if (isFavorite) {
                // Remove game from favorites
                await fetch(
                    `http://localhost:8001/v1/api/favorites/${session.user.userId}/delete/${game.id}`,
                    {
                        method: "DELETE",
                    },
                );
                setFavoriteGames((prev) => prev.filter((id) => id !== game.id)); // Update local state
            } else {
                // Add game to favorites
                await fetch(
                    `http://localhost:8001/v1/api/favorites/${session.user.userId}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            userId: session.user.userId, // Include user ID
                            ...game, // Spread the game object to include its properties
                        }),
                    },
                );
                setFavoriteGames((prev) => [...prev, game.id]); // Update local state
            }
        } catch (error) {
            console.error("Failed to update favorites", error);
            // Handle error (e.g., show a notification)
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 gap-10 md:gap-x-20 xl:gap-x-44 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {games.map((game) => (
                    // <Link
                    //     href={game.url}
                    //     key={game.id}
                    //     className="no-underline"
                    //     target="_blank"
                    // >
                    <Card
                        key={game.id}
                        className="transition-transform duration-300 ease-in-out hover:scale-105 bg-zinc-700 border-zinc-700 bg-opacity-85"
                    >
                        <CardHeader className="items-center justify-center h-64">
                            {game.cover?.image_id ? (
                                <Image
                                    src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                                    alt={game.name}
                                    width={150}
                                    height={0}
                                    className="object-cover aspect-[264/374]"
                                />
                            ) : (
                                <PlaceholderImage className="w-24 h-24" />
                            )}
                        </CardHeader>
                        <CardContent className="flex justify-center h-14 overflow-hidden">
                            <span className="prose prose-invert break-words">
                                {game.name}
                            </span>
                        </CardContent>
                        <CardFooter className="flex justify-between p-2">
                            <div className="flex items-center">
                                <StarIcon className="w-5 h-5 text-yellow-500" />
                                <p className="text-sm prose-invert prose ml-1">
                                    {game.total_rating
                                        ? `${(game.total_rating / 10).toFixed(1)} (${game.total_rating_count})`
                                        : "No rating"}
                                </p>
                            </div>
                            {favoriteGames.includes(game.id) ? (
                                <HeartSolid
                                    className="w-8 h-8 text-red-700 hover:text-red-800 cursor-pointer"
                                    onClick={() => handleFavorites(game)} // Attach the click handler
                                />
                            ) : (
                                <HeartOutline
                                    className="w-8 h-8 text-red-500 hover:text-red-700 cursor-pointer"
                                    onClick={() => handleFavorites(game)} // Attach the click handler
                                />
                            )}
                        </CardFooter>
                    </Card>
                    //</Link>
                ))}
            </div>
            <div className="mt-8 flex justify-center w-full">
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(_event, value) => handlePageChange(value)}
                    color="primary"
                    siblingCount={1}
                    boundaryCount={1}
                    sx={{
                        "& .MuiPaginationItem-root": {
                            color: "white",
                        },
                    }}
                />
            </div>
        </div>
    );
};

export function PlaceholderImage(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={60}
            height={60}
            viewBox="0 0 16 16"
            {...props}
        >
            <path
                fill="white"
                d="M6 5a2 2 0 1 1-4 0a2 2 0 0 1 4 0m9-4a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm-3.448 6.134l-3.76 2.769a.5.5 0 0 1-.436.077l-.087-.034l-1.713-.87L1 11.8V14h14V9.751zM15 2H1v8.635l4.28-2.558a.5.5 0 0 1 .389-.054l.094.037l1.684.855l3.813-2.807a.5.5 0 0 1 .52-.045l.079.05L15 8.495z"
            ></path>
        </svg>
    );
}

export default DisplayGames;
