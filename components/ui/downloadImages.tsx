"use client";

import JSZip from "jszip";

import { Download, Loader2 } from "lucide-react";

import { Button } from "./button";

import { ProcessedImages } from "@/types";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export function DownloadImages({ images }: { images: ProcessedImages }) {
  async function download() {
    const zip = new JSZip();

    const folder = zip.folder(`images-${images.imageId}`);

    const originalImage = await fetch(images.originalImageUrl);
    const originalBlob = await originalImage.blob();

    folder!.file("original.jpg", originalBlob);

    await Promise.all(
      images.results.map(async (result) => {
        const response = await fetch(result.url);
        const blob = await response.blob();
        folder!.file(`${result.channels}-${result.grain}.jpg`, blob);
      }),
    );

    const archive = await zip.generateAsync({ type: "blob" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(archive);
    link.download = `images-${images.imageId}.zip`;
    link.click();
  }

  const { mutate, isPending } = useMutation({
    mutationFn: download,

    onSuccess: () => {
      toast({
        title: "Success",
        description: "Images downloaded successfully",
      });
    },

    onError: () => {
      toast({
        title: "Error",
        variant: "destructive",
        description: `Failed to download images`,
      });
    },
  });

  return (
    <Button title="Download" onClick={() => mutate()} disabled={isPending}>
      Download {isPending ? <Loader2 className="animate-spin" /> : <Download />}
    </Button>
  );
}
