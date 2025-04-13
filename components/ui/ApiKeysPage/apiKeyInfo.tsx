"use client";

import { useRef } from "react";

import { Button } from "../button";
import { useToast } from "@/hooks/use-toast";

import { Copy } from "lucide-react";

export function ApiKeyInfo({ apiKey }: { apiKey: string }) {
  const apiKeyRef = useRef<HTMLParagraphElement>(null);

  const { toast } = useToast();

  function handleCopy() {
    if (!apiKeyRef.current) return;

    navigator.clipboard.writeText(apiKey);

    toast({
      title: "API Key",
      description: "Your API key has been copied to the clipboard.",
      duration: 5000,
    });
  }

  return (
    <div className="flex w-full items-center justify-between rounded-sm border bg-muted p-2">
      <p
        className="ml-2 basis-[90%] overflow-hidden text-ellipsis text-sm tracking-wider"
        ref={apiKeyRef}
      >
        {apiKey.slice(0, 6)}
        {Array.from({ length: 70 })
          .map(() => {
            return "•";
          })
          .join("")}
      </p>

      <Button
        size={"icon"}
        className="rgb-gradient btn-style group relative rounded-sm"
        variant={"default"}
        onClick={handleCopy}
      >
        <Copy size={16} />

        <p className="pointer-events-none invisible absolute -top-10 rounded-md bg-primary px-1.5 py-0.5 text-xs opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
          Copy
        </p>
      </Button>
    </div>
  );
}
