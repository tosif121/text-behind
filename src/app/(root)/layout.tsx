import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full flex-col items-center">
      {/* Navbar */}
      <nav className="w-full">
        <div className="mx-auto flex items-center justify-end px-4 py-4">
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </nav>
      <Separator/>
      {/* Main content */}
      <main className="flex w-full max-w-7xl flex-1 flex-col items-center px-2 py-4">
      {children}
      </main>
    </div>
  );
}
