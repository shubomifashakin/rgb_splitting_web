"use client";

import Link from "next/link";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Card } from "../card";
import { Button } from "../button";

import { Projects as ProjectsType } from "@/types";
import { usePaginate } from "@/hooks/usePaginate";

export function Projects({ projects }: { projects: ProjectsType }) {
  const { handleNext, handlePrevious, prevSearch } = usePaginate({
    nextKey: projects.nextKey,
  });

  return (
    <div className="flex h-full w-full flex-col">
      <div className="grid flex-grow grid-cols-4 grid-rows-3 items-center justify-between gap-6 overflow-hidden">
        {projects.projects.map((project) => {
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
            title="Previous"
            onClick={handlePrevious}
            className={`items-center justify-start rounded-sm transition-colors`}
          >
            <ChevronLeft /> Previous
          </Button>
        ) : null}

        {projects.nextKey && (
          <Button
            title="Next"
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
