import Link from "next/link";

import { ArrowRight } from "lucide-react";

import Logo from "@/components/ui/Logo";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex h-dvh flex-col">
      <header className="z-10 border-b px-4 py-6 md:px-6">
        <div className="flex items-center justify-between">
          <Logo />
        </div>
      </header>

      <main className="relative flex flex-grow items-center justify-center">
        <section className="z-10 flex w-full items-center justify-center py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Deconstruct. Reconstruct.
                </h1>

                <p className="mx-auto max-w-[700px] text-muted-foreground">
                  Image processing simplified for developers and creators.
                </p>
              </div>

              <div className="w-full max-w-sm space-y-2">
                <Button className="w-full" size="lg" asChild>
                  <Link
                    href="/auth"
                    className="flex items-center justify-center gap-2 capitalize"
                  >
                    Get started
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                {/* TODO: Add documentation link */}
                <a
                  href=""
                  className="rgb-gradient relative block bg-clip-text text-sm underline transition-colors duration-150 hover:bg-gradient-to-r hover:text-transparent"
                >
                  View Documentation
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="absolute left-32 top-20 h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 bg-red-600 blur-3xl dark:hidden"></div>
        <div className="absolute top-3/4 h-[150px] w-[70px] -translate-x-1/2 -translate-y-1/2 bg-green-600 blur-3xl dark:hidden"></div>
        <div className="absolute right-20 top-1/2 h-[100px] w-[120px] -translate-x-1/2 -translate-y-1/2 bg-blue-600 blur-3xl dark:hidden"></div>
      </main>

      <footer className="border-t px-4 py-6 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} rgbreak. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
