import Link from "next/link";
import Image from "next/image";

import { auth } from "@clerk/nextjs/server";

import { HeaderInfo } from "@/components/ui/headerInfo";

import { getProjectInfo } from "@/lib/dataService";

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const projectId = (await params).projectId;

  const { getToken } = await auth();

  const token = await getToken();

  if (!token) {
    throw new Error("Authentication Failed");
  }

  const projects = await getProjectInfo(token, projectId, {
    field: "gallery",
  });

  return (
    <div className="space-y-4">
      <HeaderInfo
        title="Gallery"
        description="Here are all the images you have uploaded so far."
      />

      <div className="grid grid-cols-4 gap-x-2 gap-y-8">
        {projects.projectInfo.map((project) => (
          <div
            key={project.imageId}
            className="relative size-52 overflow-hidden"
          >
            <Link href={`dashboard/${projectId}/${project.imageId}`}>
              <Image
                fill
                alt={project.imageId}
                src={project.originalImageUrl}
                className="rounded-sm border object-cover"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
