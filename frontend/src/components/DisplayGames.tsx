"use client";
import { useState, useEffect } from "react";
import fetchGames from "../utils/functions";

interface Game {
  id: number;
  name: string;
  cover?: {
    url: string;
  };
}

export default function DisplayGames() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedGames = await fetchGames();
      if (fetchedGames) {
        setGames(fetchedGames);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="prose-invert prose">
      <h1>Games</h1>
      {games.length > 0 ? (
        <ul>
          {games.map((game) => (
            <li key={game.id}>
              <p>{game.name}</p>
              <p>{game.cover?.url}</p>
              <p>{game.id}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
