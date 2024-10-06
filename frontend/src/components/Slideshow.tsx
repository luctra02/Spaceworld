"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { fetchUpcomingGames } from "../utils/functions";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";

interface Game {
    id: number;
    artworks: {
        id: number;
        image_id: string;
    }[];
    first_release_date: number;
    genres: {
        id: number;
        name: string;
    }[];
    name: string;
    summary: string;
    url: string;
    total_rating: number;
    total_rating_count: number;
    cover: {
        image_id: string;
    };
}

export default function Slideshow() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);
    const [games, setGames] = useState<Game[]>([]);
    const [isHovered, setIsHovered] = useState(false); // To track hover state
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    // Auto-slide functionality
    useEffect(() => {
        if (!api || isHovered) return; // Pause auto-slide when hovered

        const autoSlide = setInterval(() => {
            if (current === count) {
                api.scrollTo(0); // Jump to the first slide when reaching the last slide
            } else {
                api.scrollNext(); // Move to the next slide
            }
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(autoSlide); // Clear the interval on unmount
    }, [api, count, current, isHovered]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedGames = await fetchUpcomingGames();
                if (fetchedGames) {
                    setGames(fetchedGames);
                } else {
                    setError("No games found.");
                }
            } catch (error) {
                setError("Failed to fetch data from server.");
            }
        };
        fetchData();
    }, []);

    return (
        <div
            className="relative w-full"
            onMouseEnter={() => setIsHovered(true)} // Pause when hovered
            onMouseLeave={() => setIsHovered(false)} // Resume when hover ends
        >
            <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                    {games.map((game) => (
                        <CarouselItem key={game.id}>
                            <CardContent className="relative flex items-center justify-center p-0 h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
                                {game.artworks[0]?.image_id && (
                                    <Image
                                        src={`https://images.igdb.com/igdb/image/upload/t_1080p/${game.artworks[0].image_id}.jpg`}
                                        alt={game.name}
                                        width={1920}
                                        height={1080}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                {/* Transparent Black Block */}
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
                                    <Link
                                        href={game.url}
                                        key={game.id}
                                        target="_blank"
                                        className="no-underline hover:underline"
                                    >
                                        <h3>{game.name}</h3>
                                        <p className="text-sm">
                                            <strong>Release Date: </strong>
                                            {new Date(
                                                game.first_release_date * 1000,
                                            ).toLocaleDateString()}
                                        </p>
                                        <p className="text-sm">
                                            <strong>Genre: </strong>
                                            {game.genres?.map(
                                                (genre, index) => (
                                                    <span key={genre.id}>
                                                        {genre.name}
                                                        {index <
                                                            game.genres.length -
                                                                1 && ", "}
                                                    </span>
                                                ),
                                            ) ?? "N/A"}
                                        </p>
                                        <p className="text-sm">
                                            {game.summary}
                                        </p>
                                    </Link>
                                    <div className="absolute top-4 right-2">
                                        <FavoriteButton game={game} />
                                    </div>
                                </div>
                            </CardContent>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

            <div className="flex justify-center space-x-2 mt-4">
                {Array.from({ length: games.length }).map((_, index) => (
                    <span
                        key={index}
                        className={`h-3 w-3 rounded-full ${
                            current === index + 1 ? "bg-primary" : "bg-gray-400"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
