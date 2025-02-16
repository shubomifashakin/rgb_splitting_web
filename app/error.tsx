"use client";

import { useTransition } from "react";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <div className="flex h-dvh items-center justify-center">
      <div className="max-w-[600px] space-y-4 rounded-md border p-4 text-center">
        <h2 className="whitespace-break-spaces capitalize">{error.message}</h2>

        <Button
          disabled={isPending}
          size={"lg"}
          onClick={() =>
            startTransition(() => {
              router.refresh();
              reset();
            })
          }
        >
          Try again&nbsp;
          <RefreshCw className={`${isPending && "animate-spin"}`} />
        </Button>
      </div>
    </div>
  );
}
