import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function LandingPage() {
  return (
    <div className="flex h-dvh flex-col">
      <header className="border-b px-4 py-6 md:px-6">
        <div className="flex items-center justify-between">
          <Logo />
        </div>
      </header>

      <main className="flex flex-grow items-center justify-center">
        <section className="flex w-full items-center justify-center py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Deconstruct. Reconstruct.
                </h1>

                <p className="mx-auto max-w-[700px] text-sm text-muted-foreground md:text-base">
                  Simple API to split your images into different RGB channels
                  and apply grain effects.
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
              </div>
            </div>
          </div>
        </section>
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
