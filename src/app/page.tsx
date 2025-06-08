import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      {/* Navigation */}
      <header className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-base font-bold md:text-lg">
          <span className="relative inline-block text-orange-800">
            text-in-between
            {/* Underline Accent */}
            <svg
              className="absolute -bottom-1.5 left-0 w-full md:-bottom-2"
              height="8"
              viewBox="0 0 230 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.39832 6.75C29.8394 2.03125 119.95 -2.34375 228.602 5.25"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
        <nav>
          <SignedIn>
            <Button variant="default" asChild>
              <SignOutButton>Sign Out</SignOutButton>
            </Button>
          </SignedIn>
          <SignedOut>
            <Button asChild variant="default">
              <SignInButton mode="modal">Sign In</SignInButton>
            </Button>
          </SignedOut>
        </nav>
      </header>

      {/* Hero Section - Takes up the main space */}
      <main className="flex flex-1 items-start mt-3 md:mt-1 justify-center">
        <section className="w-full py-7 md:py-10">
          <div className="container mx-auto px-4 text-center sm:px-6">
            <h1 className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-6xl md:leading-tight">
              Easily create viral{" "}
              <span className="relative inline-block text-orange-800">
                text-in-between
                {/* Underline Accent */}
                <svg
                  className="absolute -bottom-1.5 left-0 w-full md:-bottom-2"
                  height="8"
                  viewBox="0 0 230 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.39832 6.75C29.8394 2.03125 119.95 -2.34375 228.602 5.25"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>{" "}
              designs
            </h1>
            <p className="mx-auto pl-6 pr-6 md:p-0 mt-4 max-w-lg md:max-w-xl text-xs text-slate-600 md:text-lg">
              The &quot;text-in-between&quot; designs are 🔥, but it&apos;s a
              headache to create. This tool makes it effortless. No design
              skills needed.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <SignedIn>
                <Link href="/text-in-between">
                  <Button className="w-full bg-black text-white hover:bg-slate-800 sm:w-auto">
                    Create Now
                  </Button>
                </Link>
              </SignedIn>
              <SignedOut>
                <Button
                  asChild
                  className="w-full bg-black text-white hover:bg-slate-800 sm:w-auto"
                >
                  <SignInButton mode="modal">Get Started for Free</SignInButton>
                </Button>
              </SignedOut>
            </div>
          </div>
        </section>
      </main>

      {/* Parallax Scroll Section */}
      <section className="mb-6">
        <ParallaxScroll images={images} />
      </section>
    </div>
  );
}

const images = [
  "https://f4l2c3q6cm.ufs.sh/f/yx7b1QjLXPSqRgYUvfkmb1p5FcagUo2qfeECnRVOB3hlvjGD",
  "https://f4l2c3q6cm.ufs.sh/f/yx7b1QjLXPSqNSUcANeXVCasj83EwuLky6TS12Mbg0qJ5YUO",
  "https://f4l2c3q6cm.ufs.sh/f/yx7b1QjLXPSq1v7u3YnDx1lS8fMNFGCXn7wZE95e24VjHmuQ",
  "https://f4l2c3q6cm.ufs.sh/f/yx7b1QjLXPSqGXeXj9ltQrne75VOPhL0TbDXJCag9jzF6sIp",
  "https://f4l2c3q6cm.ufs.sh/f/yx7b1QjLXPSqIo0Hh3cxAnKrB75ReLWdhFzMOu2kc0vJ9p8E",
  "https://f4l2c3q6cm.ufs.sh/f/yx7b1QjLXPSqNMtbkdeXVCasj83EwuLky6TS12Mbg0qJ5YUO",
  "https://f4l2c3q6cm.ufs.sh/f/yx7b1QjLXPSqjJYYu3TNlrh2LDeJSBcHGKYbZqpmQAz9ER1W",
  "https://f4l2c3q6cm.ufs.sh/f/yx7b1QjLXPSq1v4jJdnDx1lS8fMNFGCXn7wZE95e24VjHmuQ",
  "https://f4l2c3q6cm.ufs.sh/f/yx7b1QjLXPSqEeu552VIG1T38d2bRpkCvLiXxMUqV7KHPZny",
];
