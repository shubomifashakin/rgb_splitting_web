"use client";

import { useState } from "react";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Card } from "../card";
import { Button } from "../button";

import { projects } from "@/types";

export function Projects({ projects }: { projects: projects }) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const [prevSearch, setPrevSearch] = useState<object[]>(function () {
    const prevSearch = searchParams.get("history");

    return prevSearch ? JSON.parse(decodeURIComponent(prevSearch)) : [];
  });

  function handleNext() {
    if (!projects?.nextKey) return;

    setPrevSearch((current) => [...current, projects.nextKey!]);

    const setParams = new URLSearchParams();

    setParams.set(
      "query",
      encodeURIComponent(JSON.stringify(projects.nextKey)),
    );

    setParams.set(
      "history",
      encodeURIComponent(JSON.stringify([...prevSearch, projects.nextKey])),
    );

    replace(`${pathname}?${setParams.toString()}`);
  }

  function handlePrevious() {
    if (!prevSearch.length) return;

    const setParams = new URLSearchParams();

    //go back 1 item from the last item
    const queryString = prevSearch[prevSearch.length - 1 - 1];

    setParams.set("query", encodeURIComponent(JSON.stringify(queryString)));

    //remove the last item from the array
    setPrevSearch((current) => current.slice(0, current.length - 1));

    //if there is a query string,
    if (queryString) {
      replace(`${pathname}?${setParams.toString()}`);

      setParams.set(
        "history",
        encodeURIComponent(
          JSON.stringify([...prevSearch.slice(0, prevSearch.length - 1)]),
        ),
      );

      return;
    }

    setParams.set(
      "history",
      encodeURIComponent(
        JSON.stringify([...prevSearch.slice(0, prevSearch.length - 1)]),
      ),
    );

    replace(`${pathname}`);
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="grid flex-grow grid-cols-3 grid-rows-3 items-center justify-between gap-6 overflow-hidden">
        {projects.projects.slice(0, 9).map((project) => {
          const isActive = project.sub_status.split("-")[0] === "active";

          return (
            <Link
              key={project.projectId}
              href={`/dashboard/${project.projectId}`}
              prefetch={false}
            >
              <Card
                className={`group flex h-[200px] flex-col overflow-hidden rounded-sm transition-colors duration-150 ${isActive ? "hover:border-green-300 dark:hover:border-green-800" : "hover:border-red-300 dark:hover:border-red-800"}`}
              >
                <div className="w-full basis-[65%]"></div>

                <div
                  className={`flex-grow space-y-2 bg-muted p-4 ${isActive ? "group-hover:bg-green-300 dark:group-hover:bg-green-800" : "group-hover:bg-red-300 dark:group-hover:bg-red-800"}`}
                >
                  <div className="flex items-center gap-x-4">
                    <h1 className="font-semibold uppercase">
                      {project.projectName.length > 20
                        ? project.projectName.slice(0, 20).trim() + "..."
                        : project.projectName}
                    </h1>
                  </div>

                  <div className="flex items-center gap-x-2">
                    <span
                      className={
                        "inline-block rounded-sm text-sm capitalize tracking-wide"
                      }
                    >
                      {project.currentPlan}
                    </span>

                    <span
                      className={`size-2 rounded-full ${isActive ? "bg-green-300 dark:bg-green-800" : "bg-red-300 dark:bg-red-800"} `}
                    ></span>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="flex justify-end gap-x-6">
        {prevSearch.length ? (
          <Button
            onClick={handlePrevious}
            className={`items-center justify-start rounded-sm transition-colors`}
          >
            <ChevronLeft /> Previous
          </Button>
        ) : null}

        {projects.nextKey && (
          <Button
            onClick={handleNext}
            className={`items-center justify-start rounded-sm transition-colors`}
          >
            Next <ChevronRight />
          </Button>
        )}
      </div>
    </div>
  );
}
