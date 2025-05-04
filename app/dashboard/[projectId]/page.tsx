import { Suspense } from "react";
import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import { HeaderInfo } from "@/components/ui/headerInfo";
import { Gallery } from "@/components/ui/Gallery/gallery";

import { getProjectInfo } from "@/lib/dataService";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ query: string }>;
}) {
  const query = (await searchParams).query;
  const projectId = (await params).projectId;

  const { getToken } = await auth();

  const token = await getToken();

  if (!token) {
    redirect("/auth");
  }

  const projects = await getProjectInfo(token, projectId, {
    query,
    field: "gallery",
  });

  return (
    <div className="flex h-full flex-col space-y-4">
      <HeaderInfo
        title="Gallery"
        description="Here are all the images you have uploaded so far."
      />

      <Suspense>
        <Gallery projectInfo={projects} projectId={projectId} />
      </Suspense>
    </div>
  );
}
