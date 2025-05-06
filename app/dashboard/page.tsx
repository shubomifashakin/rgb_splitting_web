import { Suspense } from "react";

import { redirect } from "next/navigation";

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
    redirect("/auth");
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
