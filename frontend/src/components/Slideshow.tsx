"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export default function Slideshow() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false); // To track hover state

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Auto-slide functionality
  React.useEffect(() => {
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

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)} // Pause when hovered
      onMouseLeave={() => setIsHovered(false)} // Resume when hover ends
    >
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex items-center justify-center p-6 h-[400px]">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex justify-center space-x-2 mt-4">
        {Array.from({ length: count }).map((_, index) => (
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
