import React from "react";
import { api } from "../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import ThumbnailCreator from "@/components/thumbnail-creator";

const EditorPage = async () => {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();

  let convexUser = null;

  if (user) {
    convexUser = await convex.query(api.users.getUser, { userId: user.id });
  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4 md:px-0">
      <div className="flex max-w-full flex-col gap-6">
        {convexUser?.credits === 0 ? (
          <div>
            <Link className="flex items-center gap-2" href="/">
              <ArrowLeft className="h-4 w-4" />
              <p className="leading-7">Go back</p>
            </Link>
            <Card className="mx-auto mt-2 w-full max-w-md border shadow-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                  Hi,{" "}
                  <span className="text-orange-800">
                    {" "}
                    {convexUser?.name || "there"}!
                  </span>
                </CardTitle>
                <CardDescription className="mt-1 text-lg font-medium">
                  Sorry for the hurdle!
                </CardDescription>
                <CardDescription className="text-lg font-medium mb-3">
                  Want to create more designs?
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-5">
                <p className="text-center text-orange-800 font-bold">
                  You have {convexUser?.credits ?? 0} credit left.
                </p>
                <p className="mt-1 text-center text-sm text-muted-foreground">
                  Please buy more credits to continue.
                </p>
              </CardContent>
              <div className="px-4 pb-4">
                <Link href="/pricing">
                  <Button className="w-full">Buy Credits</Button>
                </Link>
              </div>
            </Card>
          </div>
        ) : (
          <main className="mt-0 md:mt-7">
            <ThumbnailCreator/>
          </main>
        )}
      </div>
    </div>
  );
};

export default EditorPage;
