import { ReactNode } from "react";

import Aside from "@/components/ui/aside";
import Navbar from "@/components/ui/navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-dvh flex-col">
      <Navbar />

      <div className="mx-auto flex w-full max-w-7xl flex-grow justify-between gap-x-8 pl-6">
        <Aside />

        <div className="h-full w-[1px] bg-muted"></div>

        <div className="h-full flex-grow py-4 pr-4 2xl:pr-0">{children}</div>
      </div>
    </main>
  );
}
