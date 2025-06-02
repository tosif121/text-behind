"use server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ConvexHttpClient } from "convex/browser";
import { currentUser } from "@clerk/nextjs/server";
import { api } from "../../../convex/_generated/api";
import { cn } from "@/lib/utils";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();

  let convexUser = null;

  if (user) {
    convexUser = await convex.query(api.users.getUser, { userId: user.id });
  }

  return (
    <div className="flex h-screen w-full flex-col items-center overflow-y-scroll relative">
      <div
        className={cn(
          "absolute inset-0 z-[-1] bg-gray-100 dark:bg-gray-900",
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />
      {/* Navbar */}
      <nav className="w-full">
        <div className="mx-auto flex max-w-7xl items-center justify-end px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <p className="text-sm text-muted-foreground">
                {convexUser?.credits ?? 0} credits left
              </p>
            </Button>
            <Link href="/pricing">
              <Button size="sm">Buy more</Button>
            </Link>
            <UserButton />
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
