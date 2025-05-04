"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { Button } from "./button";

import {
  Cpu,
  Plus,
  Images,
  Settings,
  LayoutPanelLeft,
  KeyRound,
} from "lucide-react";

const links = [
  {
    name: "Apps",
    path: "/dashboard",
    icon: <LayoutPanelLeft />,
  },
  {
    name: "New App",
    path: "/dashboard/new",
    icon: <Plus />,
  },
];

const projectIdLinks = [
  { name: "Gallery", path: "", icon: <Images size={16} /> },
  { name: "API Keys", path: "/api-keys", icon: <KeyRound size={16} /> },
  {
    name: "Plans & Billing",
    path: "/plans",
    icon: <Cpu size={16} />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <Settings size={16} />,
  },
];

export default function Aside() {
  const pathName = usePathname();
  const params = useParams<{ projectId: string }>();

  const filteredPaths = links.map((c) => c.path);

  return (
    <aside className={`relative flex h-full flex-col justify-between py-6`}>
      <div className="flex w-full flex-col gap-y-6 overflow-hidden">
        {filteredPaths.includes(pathName) &&
          links.map((link, index) => {
            return (
              <Button
                asChild
                key={index}
                className={`rounded-sm transition-colors ${pathName === link.path ? "rgb-gradient-active text-white" : ""}`}
                variant={"default"}
              >
                <Link
                  href={link.path}
                  prefetch={true}
                  className="flex gap-2 rounded-lg"
                >
                  <span className="flex flex-shrink-0 items-center justify-center">
                    {link.icon}
                  </span>

                  <span className="text-sm">{link.name}</span>
                </Link>
              </Button>
            );
          })}

        {!filteredPaths.includes(pathName) &&
          projectIdLinks.map((link, index) => {
            const fullPathName = `/dashboard/${params.projectId}${link.path}`;

            return (
              <Button
                asChild
                key={index}
                className={`justify-start rounded-sm transition-colors ${pathName === fullPathName ? "rgb-gradient-active text-white" : ""}`}
                variant={"default"}
              >
                <Link href={fullPathName} className="flex gap-1 rounded-lg">
                  <span className="flex flex-shrink-0 items-center justify-center">
                    {link.icon}
                  </span>

                  <span className="text-sm tracking-wide">{link.name}</span>
                </Link>
              </Button>
            );
          })}
      </div>

      <div className="flex flex-col"></div>
    </aside>
  );
}
