"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Pagination from "@mui/material/Pagination";

type PaginatedCardsProps = {
  totalCards: number;
  cardsPerPage: number;
};

const PaginatedCards: React.FC<PaginatedCardsProps> = ({
  totalCards,
  cardsPerPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  // Calculate the start and end indices for the cards to display
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = Math.min(startIndex + cardsPerPage, totalCards); // Adjust the end index to avoid overflow

  // Cards to display based on the current page, limiting to actual number of cards
  const cardsToDisplay = Array.from(
    { length: endIndex - startIndex }, // Adjust length to avoid overflowing cards
    (_, index) => startIndex + index + 1
  );

  return (
    <div>
      <div className="grid grid-cols-1 gap-10 md:gap-x-20 xl:gap-x-44 md:grid-cols-2 xl:grid-cols-3">
        {cardsToDisplay.map((cardIndex) => (
          <Card
            key={cardIndex}
            className="p-4 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
          >
            <CardContent className="flex items-center justify-center h-44">
              <span className="text-lg font-semibold">Card {cardIndex}</span>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 flex justify-center w-full">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          siblingCount={1} // Number of sibling pages to show on each side
          boundaryCount={1} // Number of boundary pages to show at the start and end
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white", // Text color for pagination items
            },
          }}
        />
      </div>
    </div>
  );
};

export default PaginatedCards;
