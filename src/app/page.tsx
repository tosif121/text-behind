import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { ThemeToggle } from "@/components/theme-toggle";
import AnimatedGridBackground from "@/components/animated-grid-background";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground relative">
      <AnimatedGridBackground />
      {/* Navigation */}
      <header className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-3 relative z-10">
        <Link href="/" className="text-base font-bold md:text-lg">
          <span className="relative inline-block text-orange-800 dark:text-orange-400">
            TextBehind
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
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a
              href="https://x.com/its_tossi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-muted-foreground flex items-center gap-2 transition-colors"
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
            <a
              href="https://www.linkedin.com/in/tosif-raza-247471205/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-muted-foreground flex items-center gap-2 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section - Takes up the main space */}
      <main className="flex flex-1 items-start mt-3 md:mt-1 justify-center relative z-10">
        <section className="w-full py-7 md:py-15">
          <div className="container mx-auto px-4 text-center sm:px-6">
            <h1 className="text-4xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-6xl md:leading-tight">
              Auto Insert{" "}
              <span className="relative inline-block text-orange-800 dark:text-orange-400">
                text behind
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
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>{" "}
              your images
            </h1>
            <p className="mx-auto pl-4 pr-4 md:p-0 mt-6 max-w-lg md:max-w-xl text-sm text-muted-foreground md:text-lg">
              Create professional YouTube thumbnails and social media graphics with{" "}
              <span className="text-foreground font-semibold">AI-powered background removal</span>{" "}
              and customizable text overlays.
            </p>
            <div className="mt-8 flex flex-row items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <Link href="/text-behind">
                <Button className="px-8 py-4 text-base font-semibold transition-all duration-200 hover:scale-105">
                  Try Now
                </Button>
              </Link>
              
              <Link target="_blank" href="https://youtu.be/zxjSYs5os2w">
                <Button variant="outline" className="px-8 py-4 text-base font-semibold transition-all duration-200 hover:scale-105">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Trending Section */}
      <section className="py-12 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trending Text-Behind-Image Style Posts</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stand Out on Instagram with Eye-Catching Text-Behind-Image Designs
            </p>
          </div>
          
          {/* Featured Images */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6 text-center">Featured Images</h3>
            <ParallaxScroll images={images} />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-muted/30 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Create Your Design in 4 Simple Steps</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transform your images into stunning designs with our easy-to-use process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">1. Upload Photo</h3>
              <p className="text-muted-foreground text-sm">Upload any image from your device</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">2. Add Text</h3>
              <p className="text-muted-foreground text-sm">Add and style your text layers</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">3. Position Text</h3>
              <p className="text-muted-foreground text-sm">Place text behind image elements</p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">4. Download</h3>
              <p className="text-muted-foreground text-sm">Export in high quality PNG format</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const images = [
  "/images/image1.png",
  "/images/image2.png",
  "/images/image3.png",
  "/images/image4.png",
  "/images/image5.png",
  "/images/image6.png",
  "/images/image7.png",
  "/images/image8.png",
  "/images/image9.png",
  "/images/image10.png",
  "/images/image11.png",
  "/images/image12.png",
];
