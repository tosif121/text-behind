import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check } from "lucide-react";
import ThumbnailCreator from "@/components/thumbnail-creator";
import ErrorBoundary from "@/components/ErrorBoundary";

const EditorPage = async () => {
  // No authentication needed - show main content directly
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex h-screen w-full items-start mt-3 justify-center px-4 md:px-0">
        <div className="flex max-w-full flex-col gap-6">
          <main className="mt-0 md:mt-7">
            <ErrorBoundary>
              <ThumbnailCreator />
            </ErrorBoundary>
          </main>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
