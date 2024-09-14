"use client";

import React, { useEffect, useState } from "react";
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
import { StarIcon } from "@heroicons/react/20/solid";

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

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        try {
          const { data: fetchedGames, totalCount: totalCount } =
            await fetchSearchedGames(currentPage, cardsPerPage, search);
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
          const fetchedGames = await fetchGames(currentPage, cardsPerPage);
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

  return (
    <div>
      <div className="grid grid-cols-1 gap-10 md:gap-x-20 xl:gap-x-44 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {games.map((game) => (
          <Link
            href={game.url}
            key={game.id}
            className="no-underline"
            target="_blank"
          >
            <Card className="transition-transform duration-300 ease-in-out hover:scale-105 bg-zinc-700 border-zinc-700 bg-opacity-85">
              <CardHeader className="items-center justify-center h-64">
                {game.cover?.image_id && (
                  <Image
                    src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                    alt={game.name}
                    width={150}
                    height={0}
                    className="object-cover aspect-[264/374]"
                  />
                )}
              </CardHeader>
              <CardContent className="flex justify-center h-14 overflow-hidden">
                <span className="prose prose-invert break-words">
                  {game.name}
                </span>
              </CardContent>
              <CardFooter className="flex p-2">
                <div className="flex items-center">
                  <StarIcon className="w-5 h-5 text-yellow-500" />
                  <p className="text-sm prose-invert prose ml-1">
                    {(game.total_rating / 10).toFixed(1)}(
                    {game.total_rating_count})
                  </p>
                </div>
              </CardFooter>
            </Card>
          </Link>
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

export default DisplayGames;
