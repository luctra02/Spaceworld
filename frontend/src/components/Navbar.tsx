"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function Navbar() {
  return (
    <nav>
      <div className="flex flex-col">
        <Link href="/">
          <Button>Home</Button>
        </Link>
      </div>
    </nav>
  );
}
