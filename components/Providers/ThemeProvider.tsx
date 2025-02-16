"use client";
import { createContext, ReactNode, useState, useEffect } from "react";

export const ThemeCtx = createContext<{
  currentTheme: "light" | "dark";
  updateTheme: () => void;
}>({ currentTheme: "light", updateTheme() {} });

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, changeTheme] = useState<"light" | "dark">("light");

  const updateDocumentClass = (theme: "light" | "dark") => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");

      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");

      localStorage.setItem("theme", "light");
    }
  };

  function updateTheme() {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    updateDocumentClass(newTheme);
    changeTheme(newTheme);
  }

  useEffect(() => {
    const storageTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const systemPreferences = mediaQuery.matches ? "dark" : "light";
    const theme = storageTheme ? storageTheme : systemPreferences;

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }

    changeTheme(theme);
  }, []);

  return (
    <ThemeCtx.Provider value={{ currentTheme, updateTheme }}>
      {children}
    </ThemeCtx.Provider>
  );
}
