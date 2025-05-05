"use client";

import { useContext } from "react";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import { Moon, Sun } from "lucide-react";

import Logo from "./Logo";
import { Button } from "./button";
import { ThemeCtx } from "../Providers/ThemeProvider";

export default function Navbar() {
  const { currentTheme, updateTheme } = useContext(ThemeCtx);

  return (
    <nav className="mx-auto flex h-24 w-full max-w-7xl items-center justify-between border-b p-6">
      <Link href={"/dashboard"}>
        <Logo />
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
          className="transition-colors duration-150 hover:text-white [&_svg]:size-5"
          variant={"ghost"}
          title={currentTheme === "dark" ? "Switch to light" : "Switch to dark"}
        >
          {currentTheme === "dark" ? <Moon /> : <Sun />}
        </Button>

        <UserButton />
      </div>
    </nav>
  );
}
