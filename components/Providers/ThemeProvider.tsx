"use client";

import { createContext, ReactNode, useState, useEffect } from "react";

export const ThemeCtx = createContext<{
  currentTheme: "light" | "dark";
  updateTheme: () => void;
}>({ currentTheme: "dark", updateTheme() {} });

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, changeTheme] = useState<"light" | "dark">("dark");

  const updateDocumentClass = (theme: "light" | "dark") => {
    if (theme === "dark") {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";

      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      document.documentElement.style.colorScheme = "light";

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

    const theme = storageTheme ? storageTheme : "light";

    document.documentElement.classList.add(theme);
    document.documentElement.style.colorScheme = theme;

    changeTheme(theme);
  }, []);

  return (
    <ThemeCtx.Provider value={{ currentTheme, updateTheme }}>
      {children}
    </ThemeCtx.Provider>
  );
}
