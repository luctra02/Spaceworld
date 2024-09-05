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

  // Calculate the cards to display based on the current page
  const startIndex = (currentPage - 1) * cardsPerPage;
  const cardsToDisplay = Array.from({ length: cardsPerPage }).map(
    (_, index) => startIndex + index + 1
  );

  return (
    <div>
      <div className="grid grid-cols-1 gap-10 gap-x-56 sm:grid-cols-2 lg:grid-cols-3">
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
        />
      </div>
    </div>
  );
};

export default PaginatedCards;
