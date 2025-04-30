import { Suspense } from "react";

import { auth } from "@clerk/nextjs/server";

import { Projects } from "@/components/ui/dashboardLanding/projects";

import { getUsersProjects } from "@/lib/dataService";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;

  const { getToken } = await auth();

  const token = await getToken();

  if (!token) {
    throw new Error("Authentication Failed");
  }

  const data = await getUsersProjects(token, query);

  return (
    <div className="h-full w-full overflow-hidden">
      <Suspense>
        <Projects projects={data} />
      </Suspense>
    </div>
  );
}
