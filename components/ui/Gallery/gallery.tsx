"use client";

import Link from "next/link";
import Image from "next/image";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { usePaginate } from "@/hooks/usePaginate";

import { Button } from "../button";

import { ProjectInfo } from "@/types";

export function Gallery({
  projectId,
  projectInfo,
}: {
  projectId: string;
  projectInfo: ProjectInfo;
}) {
  const { handleNext, handlePrevious, prevSearch } = usePaginate({
    nextKey: projectInfo.nextKey,
  });

  return (
    <div className="flex w-full flex-grow flex-col gap-y-4">
      <div className="grid flex-grow grid-cols-4 gap-x-8 gap-y-8">
        {projectInfo.projectInfo.map((project) => (
          <div
            key={project.imageId}
            className="relative size-52 overflow-hidden"
          >
            <Link href={`${projectId}/${project.imageId}`}>
              <Image
                fill
                priority
                alt={"Gallery Image"}
                src={project.originalImageUrl}
                className="rounded-sm border object-cover"
              />
            </Link>
          </div>
        ))}
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

        {projectInfo.nextKey && (
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
