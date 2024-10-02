import Slideshow from "@/components/Slideshow";
import DisplayGames from "@/components/DisplayGames";
export default function Home() {
    const totalCards = 1000;
    const cardsPerPage = 12;

    return (
        <main className="flex min-h-screen flex-col p-24 prose prose-invert lg:prose-xl max-w-full">
            <h2>Featured Games</h2>
            <Slideshow />
            <h2 className="mt-20">All Games</h2>
            <DisplayGames totalCards={totalCards} cardsPerPage={cardsPerPage} />
        </main>
    );
}
