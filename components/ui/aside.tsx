import Link from "next/link";

import { KeySquare, Plus } from "lucide-react";

const links = [
  {
    name: "Api Keys",
    path: "/dashboard",
    icon: <KeySquare />,
  },
  {
    name: "New App",
    path: "/dashboard/new",
    icon: <Plus />,
  },
];

import { Button } from "./button";

export default function Aside() {
  return (
    <aside className={`relative flex h-full flex-col justify-between py-4`}>
      <div className="flex w-full flex-col gap-y-6 overflow-hidden">
        {links.map((link, index) => {
          return (
            <Button
              asChild
              key={index}
              className="btn-style rgb-gradient"
              variant={"default"}
            >
              <Link href={link.path} className="flex gap-2 rounded-lg">
                <span className="flex flex-shrink-0 items-center justify-center">
                  {link.icon}
                </span>

                <span className="text-sm">{link.name}</span>
              </Link>
            </Button>
          );
        })}
      </div>

      <div className="flex flex-col"></div>
    </aside>
  );
}
