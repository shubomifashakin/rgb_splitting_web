"use client";

import { useContext } from "react";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import { Moon, Sun } from "lucide-react";

import { Button } from "./button";
import { ThemeCtx } from "../Providers/ThemeProvider";

export default function Navbar() {
  const { currentTheme, updateTheme } = useContext(ThemeCtx);

  return (
    <nav className="mx-auto flex h-24 w-full max-w-7xl items-center justify-between border-b p-6">
      <Link href={"/dashboard"}>
        <div className="group flex items-center text-4xl font-extrabold lowercase">
          <span className="text-red-300 dark:text-red-600/80">R</span>
          <span className="text-green-300 dark:text-green-600/80">G</span>
          <span className="text-blue-300 dark:text-blue-600/80">B</span>
          <span className="rgb-gradient mt-2 bg-clip-text text-2xl transition-colors duration-150 ease-linear group-hover:bg-gradient-to-r group-hover:text-transparent">
            reak
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-x-4">
        <Link
          href={"/"} //TODO: THE LINK TO THE DOCS
          className="rgb-gradient relative bg-clip-text text-sm transition-colors duration-150 after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-full after:bg-black after:content-[''] hover:bg-gradient-to-r hover:text-transparent hover:after:bg-gradient-to-r dark:after:bg-white"
        >
          Documentation
        </Link>

        <Button
          onClick={updateTheme}
          className="[&_svg]:size-5"
          variant={"ghost"}
        >
          {currentTheme === "dark" ? <Moon /> : <Sun />}
        </Button>

        <UserButton />
      </div>
    </nav>
  );
}
