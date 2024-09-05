import Slideshow from "@/components/Slideshow";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24 prose lg:prose-xl max-w-full">
      <h2>Featured Games</h2>
      <div className="not-prose">
        <Slideshow />
      </div>
      <h2 className="mt-20">All Games</h2>
    </main>
  );
}
