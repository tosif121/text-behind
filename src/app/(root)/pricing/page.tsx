import { ArrowLeft, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-2">
        {/* Pricing Card */}
        <div className="max-w-sm mx-auto mt-11 ">
          <Link
            className="flex items-center gap-2 mb-2"
            href="/text-in-between"
          >
            <ArrowLeft className="h-4 w-4" />
            <p className="leading-7">Go back</p>
          </Link>
          <Card>
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Creator</CardTitle>
              <div className="mt-3">
                <span className="text-2xl font-bold">$9</span>
                <span className="text-muted-foreground">/Life Time</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">1000 images</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">All customization features</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Access to new features</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <Link href={"https://x.com/AdityaShips"}>
                    <span className="text-sm text-orange-700">
                      Chat with founder (Click to DM)
                    </span>
                  </Link>
                </li>
              </ul>
              <SignedIn>
                <Button className="w-full" variant="default" size="lg" asChild>
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
                <Button className="w-full" variant="default" size="lg" asChild>
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
          <p className="text-accent-foreground text-xs text-center mt-5">
            I&apos;m just 1 person, I need your support to keep the
          </p>
          <p className="text-accent-foreground text-xs text-center">
            service running. I need to pay for the servers!
          </p>
          <p className="text-accent-foreground text-xs text-center">
            please purchase credits and continue using the service.
          </p>
          <p className="text-accent-foreground text-xs text-center mt-3">
            When you visit the payment portal
          </p>
          <p className="text-accent-foreground text-xs text-center">
            paste the same email you used to sign in to TextInBetween
          </p>
        </div>
      </div>
    </div>
  );
}
