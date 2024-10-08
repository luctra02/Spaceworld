import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { Game } from "@/types/game";
import { useToast } from "@/hooks/use-toast";

interface FavoriteButtonProps {
    game: Game;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ game }) => {
    const { data: session } = useSession();
    const [favoriteGames, setFavoriteGames] = useState<number[]>([]);
    const { toast } = useToast();

    // Fetch favorites when session changes
    useEffect(() => {
        const fetchFavorites = async () => {
            if (session?.user?.userId) {
                const response = await fetch(
                    `http://localhost:8001/v1/api/favorites/${session.user.userId}`,
                );
                const favorites = await response.json();
                const favoriteIds = favorites.map(
                    (fav: { id: number }) => fav.id,
                );
                setFavoriteGames(favoriteIds);
            } else {
                setFavoriteGames([]);
            }
        };

        fetchFavorites();
    }, [session]);

    const handleFavorites = async () => {
        if (!session) {
            toast({
                title: "You need to log in to add favorites!",
                description: "Please log in to manage your favorite games.",
            });
            return;
        }

        const isFavorite = favoriteGames.includes(game.id);

        try {
            if (isFavorite) {
                // Remove game from favorites
                await fetch(
                    `http://localhost:8001/v1/api/favorites/${session.user.userId}/delete/${game.id}`,
                    {
                        method: "DELETE",
                    },
                );
                setFavoriteGames((prev) => prev.filter((id) => id !== game.id));
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
                            userId: session.user.userId,
                            ...game,
                        }),
                    },
                );
                setFavoriteGames((prev) => [...prev, game.id]);
            }
        } catch (error) {
            console.error("Failed to update favorites", error);
        }
    };

    const isFavorited = favoriteGames.includes(game.id);

    return isFavorited ? (
        <HeartSolid
            className="w-8 h-8 text-red-700 hover:text-red-800 cursor-pointer"
            onClick={(e) => {
                e.stopPropagation();
                handleFavorites();
                toast({
                    title: "Removed from Favorites",
                    description: `${game.name} was removed from your favorites.`,
                });
            }}
        />
    ) : (
        <HeartOutline
            className="w-8 h-8 text-red-500 hover:text-red-700 cursor-pointer"
            onClick={(e) => {
                e.stopPropagation();
                handleFavorites();
                toast({
                    title: "Added to Favorites",
                    description: `${game.name} was added to your favorites.`,
                });
            }}
        />
    );
};

export default FavoriteButton;
