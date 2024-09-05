"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-x-neutral-600 p-5">
      <div className="flex gap-8">
        <Link href="/">
          <Button>Home</Button>
        </Link>

        <Link href="/favorites">
          <Button>Favorites</Button>
        </Link>
      </div>
    </nav>
  );
}
