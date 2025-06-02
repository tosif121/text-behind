import { ArrowLeft, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <div
              className={cn(
                "absolute inset-0 z-[-1] bg-gray-100 dark:bg-gray-900",
                "absolute inset-0",
                "[background-size:20px_20px]",
                "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
                "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
              )}
            />
      <div className="container mx-auto px-2">
        {/* Pricing Card */}
        <div className="max-w-sm mx-auto mt-10 md:mt-15">
        <Link className="flex items-center gap-2 mb-2" href="/text-in-between">
          <ArrowLeft className="h-4 w-4" />
          <p className="leading-7">Go back</p>
        </Link>
          <Card>
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Professional</CardTitle>
              <div className="mt-3">
                <span className="text-2xl font-bold">$3.5</span>
                <span className="text-muted-foreground">/One Time</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Create upto 50 designes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">All customization features</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">
                    Access your recently created designes
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">
                    Acess to new upcoming features
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Priority support</span>
                </li>
              </ul>
              <Button className="w-full" variant="default" size="lg" asChild>
                <Link
                  href={
                    "https://test.checkout.dodopayments.com/buy/pdt_cbe5YmHlWo4veeSLxSgqW?quantity=1"
                  }
                  className="flex items-center justify-center"
                >
                  <SignedIn>
                    <span>Buy Now</span>
                  </SignedIn>
                  <SignedOut>
                    <span>Sign in to Buy</span>
                  </SignedOut>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
