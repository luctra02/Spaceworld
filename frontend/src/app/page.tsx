import Slideshow from "@/components/Slideshow";
import PaginatedCards from "@/components/PaginatedCards";
export default function Home() {
  const totalCards = 1000;
  const cardsPerPage = 9;

  return (
    <main className="flex min-h-screen flex-col p-24 prose lg:prose-xl max-w-full">
      <h2>Featured Games</h2>
      <Slideshow />
      <h2 className="mt-20">All Games</h2>
      <PaginatedCards totalCards={totalCards} cardsPerPage={cardsPerPage} />
    </main>
  );
}
