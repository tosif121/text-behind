import React from "react";
import { api } from "../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check } from "lucide-react";
import ThumbnailCreator from "@/components/thumbnail-creator";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const EditorPage = async () => {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();

  let convexUser = null;

  if (user) {
    convexUser = await convex.query(api.users.getUser, { userId: user.id });
  }

  return (
    <div className="flex h-screen w-full items-start mt-3 justify-center px-4 md:px-0">
      <div className="flex max-w-full flex-col gap-6">
        {convexUser?.credits === 0 ? (
          <div className="min-h-screen">
            <div className="container mx-auto px-2">
              {/* Pricing Card */}
              <div className="max-w-sm mx-auto mt-8">
                <Link className="flex items-center gap-2 mb-2" href="/">
                  <ArrowLeft className="h-4 w-4" />
                  <p className="leading-7">Go back</p>
                </Link>
                <Card>
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl">Creator</CardTitle>
                    <div className="mt-3">
                      <span className="text-2xl font-bold">$3.5</span>
                      <span className="text-muted-foreground">/One Time</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">Create upto 100 designs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">
                          All customization features
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">Access to new features</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">Priority support</span>
                      </li>
                    </ul>
                    <SignedIn>
                      <Button
                        className="w-full"
                        variant="default"
                        size="lg"
                        asChild
                      >
                        <Link
                          href={
                            "https://text-in-between-app.lemonsqueezy.com/buy/43b1dc05-92a7-45ad-b7b1-c965fbad9dbf"
                          }
                          className="flex items-center justify-center"
                        >
                          <span>Buy Now</span>
                        </Link>
                      </Button>
                    </SignedIn>

                    <SignedOut>
                      <Button
                        className="w-full"
                        variant="default"
                        size="lg"
                        asChild
                      >
                        <Link
                          href={"/sign-in"}
                          className="flex items-center justify-center"
                        >
                          <span>Sign In to buy</span>
                        </Link>
                      </Button>
                    </SignedOut>
                  </CardContent>
                </Card>
                <p className="text-accent-foreground text-sm text-center mt-3">
                  Please use the same email
                </p>
                <p className="text-accent-foreground text-sm text-center">
                  You have registered with
                </p>
                <p className="text-accent-foreground text-sm text-center">
                  while billing
                </p>
              </div>
            </div>
          </div>
        ) : (
          <main className="mt-0 md:mt-7">
            <ThumbnailCreator />
          </main>
        )}
      </div>
    </div>
  );
};

export default EditorPage;
