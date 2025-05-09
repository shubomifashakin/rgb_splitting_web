import Image from "next/image";
import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import { HeaderInfo } from "@/components/ui/headerInfo";

import { getProcessedImages } from "@/lib/dataService";

import { DownloadImages } from "@/components/ui/downloadImages";

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string; imageId: string[] }>;
}) {
  const { imageId, projectId } = await params;

  const { getToken } = await auth();

  const token = await getToken();

  if (!token) {
    redirect("/auth");
  }

  const data = await getProcessedImages(token, projectId, imageId[0]);

  return (
    <div className="space-y-4">
      <HeaderInfo
        title="Results"
        description="Here are the original & processed versions of your image."
      />

      <div className="flex w-full flex-wrap justify-between gap-8">
        <div
          key={data.originalImageUrl}
          className="relative aspect-square w-full overflow-hidden rounded-sm border md:size-52"
        >
          <Image
            fill
            alt="Original Image"
            className="object-cover"
            src={data.originalImageUrl}
          />
        </div>

        {data.results.map((result) => (
          <div
            key={result.url}
            className="relative aspect-square w-full overflow-hidden rounded-sm border md:size-52"
          >
            <Image
              fill
              src={result.url}
              className="object-cover"
              alt={`Processed Image with channels ${result.channels} and grain ${result.grain}`}
              priority
            />
          </div>
        ))}
      </div>

      <DownloadImages images={data} />
    </div>
  );
}
