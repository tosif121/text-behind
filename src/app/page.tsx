import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="border-b px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          TryOnThumbnail
        </Link>
        <nav className="flex gap-4">
          <SignedOut>
            <Button asChild variant="default">
              <SignInButton mode="modal">Sign In</SignInButton>
            </Button>
          </SignedOut>
          <SignedIn>
            <Button variant="default" asChild>
              <SignOutButton>Sign Out</SignOutButton>
            </Button>
          </SignedIn>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            Create{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-500 bg-clip-text text-transparent">
              Text-In-Between
            </span>{" "}
            Designs
          </h1>
          <p className="max-w-xl mx-auto text-gray-600 mb-8">
            Text-In-Between designs are 🔥, but a pain to make. This tool lets
            you generate them instantly — no Photoshop required.
          </p>
          <div className="flex justify-center gap-4">
            <Link href={"/text-in-between"}>
              <Button size="lg">Get Started</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
