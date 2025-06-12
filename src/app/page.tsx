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
        <nav className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/AdityaShips"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-700 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.917 2.2-4.917 4.917 0 .385.045.76.127 1.122-4.083-.205-7.702-2.16-10.126-5.134-.423.725-.666 1.562-.666 2.457 0 1.697.865 3.194 2.181 4.073-.803-.026-1.56-.247-2.22-.616v.062c0 2.37 1.685 4.348 3.918 4.798-.411.111-.844.171-1.292.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.396 0-.788-.023-1.175-.067 2.179 1.396 4.768 2.212 7.557 2.212 9.054 0 14.002-7.496 14.002-13.986 0-.213-.005-.425-.014-.637.961-.695 1.8-1.562 2.46-2.549z" />
              </svg>
            </a>
          </div>
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
        <section className="w-full py-7 md:py-15">
          <div className="container mx-auto px-4 text-center sm:px-6">
            <h1 className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-6xl md:leading-tight">
              Insert{" "}
              <span className="relative inline-block text-orange-800">
                text in between
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
              your image easily!
            </h1>
            <p className="mx-auto pl-4 pr-4 md:p-0 mt-4 max-w-lg md:max-w-xl text-xs text-slate-600 md:text-lg">
              Create pov-style Youtube thumbnails and other social media posts
              that actually go viral.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <SignedIn>
                <Link href="/text-in-between">
                  <Button className="w-full bg-black text-white hover:bg-slate-800 sm:w-auto">
                    Create New
                  </Button>
                </Link>
              </SignedIn>
              <SignedOut>
                <Button
                  asChild
                  className=" bg-black text-white hover:bg-slate-800 sm:w-auto"
                >
                  <SignInButton mode="modal">Try Now</SignInButton>
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
  "https://f4l2c3q6cm.ufs.sh/f/yx7b1QjLXPSqGXeXj9ltQrne75VOPhL0TbDXJCag9jzF6sIp",
  "https://f4l2c3q6cm.ufs.sh/f/yx7b1QjLXPSqIo0Hh3cxAnKrB75ReLWdhFzMOu2kc0vJ9p8E",
  "https://f4l2c3q6cm.ufs.sh/f/yx7b1QjLXPSqNMtbkdeXVCasj83EwuLky6TS12Mbg0qJ5YUO",
  "https://f4l2c3q6cm.ufs.sh/f/yx7b1QjLXPSqRgYUvfkmb1p5FcagUo2qfeECnRVOB3hlvjGD",
  "https://f4l2c3q6cm.ufs.sh/f/yx7b1QjLXPSqNSUcANeXVCasj83EwuLky6TS12Mbg0qJ5YUO",
  "https://f4l2c3q6cm.ufs.sh/f/yx7b1QjLXPSq1v7u3YnDx1lS8fMNFGCXn7wZE95e24VjHmuQ",
  "https://f4l2c3q6cm.ufs.sh/f/yx7b1QjLXPSqjJYYu3TNlrh2LDeJSBcHGKYbZqpmQAz9ER1W",
  "https://f4l2c3q6cm.ufs.sh/f/yx7b1QjLXPSq1v4jJdnDx1lS8fMNFGCXn7wZE95e24VjHmuQ",
  "https://f4l2c3q6cm.ufs.sh/f/yx7b1QjLXPSqEeu552VIG1T38d2bRpkCvLiXxMUqV7KHPZny",
];
