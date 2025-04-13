"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

import { Loader2, RefreshCw } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { apiKeyInfo } from "@/types";

import { getUsersProjects } from "@/lib/dataService";

export default function Page() {
  const { getToken, userId } = useAuth();

  const { data, status, error, isRefetching, refetch } = useQuery({
    queryKey: ["applications", userId],

    queryFn: async () => {
      const token = await getToken();

      if (!token) {
        throw new Error("Authentication Failed");
      }

      return getUsersProjects(token);
    },

    refetchOnWindowFocus: false,
  });

  return (
    <div className="h-full w-full overflow-hidden">
      {status === "pending" && (
        <div>
          <div className="flex items-center gap-x-2">
            Loading <Loader2 size={16} className="animate-spin" />
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="max-w-[600px] space-y-4 rounded-md border p-4 text-center">
          <h2 className="whitespace-break-spaces capitalize">
            {error.message}
          </h2>

          <Button disabled={isRefetching} size={"lg"} onClick={() => refetch()}>
            Try again&nbsp;
            <RefreshCw className={`${isRefetching && "animate-spin"}`} />
          </Button>
        </div>
      )}

      {status === "success" && <Projects projects={data} />}
    </div>
  );
}

function Projects({ projects }: { projects: apiKeyInfo[] }) {
  return (
    <div className="grid h-full grid-cols-3 grid-rows-3 items-center justify-between gap-6 overflow-hidden">
      {projects.slice(0, 9).map((project) => {
        const isActive = project.sub_status.split("-")[0] === "active";

        return (
          <Link
            key={project.projectId}
            href={`/dashboard/${project.projectId}`}
          >
            <Card
              className={`group flex h-[250px] flex-col overflow-hidden rounded-sm transition-colors duration-150 ${isActive ? "hover:border-green-300 dark:hover:border-green-800" : "hover:border-red-300 dark:hover:border-red-800"}`}
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
  );
}
