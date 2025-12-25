import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - TextBehind",
    absolute: "TextBehind",
  },
  description:
    "Create stunning thumbnails with text overlays behind your images. Free AI-powered background removal and professional text customization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Analytics />
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
              {children}
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  className: 'bg-card text-card-foreground border border-border',
                  style: {},
                  success: {
                    duration: 3000,
                    className: 'bg-green-50 text-green-900 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800',
                  },
                  error: {
                    duration: 5000,
                    className: 'bg-red-50 text-red-900 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-800',
                  },
                  loading: {
                    className: 'bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-800',
                  },
                }}
              />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
