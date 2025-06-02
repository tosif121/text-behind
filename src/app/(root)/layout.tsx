"use server";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ConvexHttpClient } from "convex/browser";
import { currentUser } from "@clerk/nextjs/server";
import { api } from "../../../convex/_generated/api";

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
    <div className="flex h-screen w-full flex-col items-center overflow-y-scroll">
      {/* Navbar */}
      <nav className="w-full bg-background">
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
        <Separator />
      </nav>
      {children}
    </div>
  );
}
