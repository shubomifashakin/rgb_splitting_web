"use client";

import { memo, Suspense, useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";

import { Loader2Icon, LogIn } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PricingTable } from "@/components/ui/plans";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { triggerPayment } from "@/lib/dataService";
import { toast } from "@/hooks/use-toast";

export default function Page() {
  return (
    <div>
      <h1 className="text-xl font-medium">Create A New App</h1>

      <Suspense>
        <NewProjectForm />
      </Suspense>
    </div>
  );
}

function NewProjectForm() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const oldProjectName = searchParams.get("projectName");

  const [selectedPlan, setPlan] = useState<null | string>(null);
  const [projectName, setProjectName] = useState(oldProjectName ?? "");

  const { user } = useUser();

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ["subscription"],

    mutationFn: triggerPayment,

    onError: (error: unknown) => {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to create application.",
        variant: "destructive",
      });
    },

    onSuccess: (data) => {
      //go to the payment page
      if (data.data) {
        window.location.assign(data.data.link);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    },
  });

  const handleSelectPlan = useCallback((plan: string) => {
    setPlan(plan);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedPlan || !projectName || !user) return;

    mutate({
      projectName,
      selectedPlan,
      userId: user.id,
      projectId: projectId ?? "",
      email: user.emailAddresses[0].emailAddress,
      fullName: `${user.firstName} ${user.lastName}`,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-y-4">
      <div className="space-y-1.5">
        <InputLabel />

        <Input
          minLength={5}
          maxLength={50}
          id="projectName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />

        <small className="block text-right text-xs">
          ~&nbsp;Max. 50 Characters.
        </small>
      </div>

      <BottomHalf
        isPending={isPending}
        handleSelectPlan={handleSelectPlan}
        selectedPlan={selectedPlan}
      />
    </form>
  );
}

const BottomHalf = memo(function BottomHalf({
  isPending,
  handleSelectPlan,
  selectedPlan,
}: {
  isPending: boolean;
  handleSelectPlan: (s: string) => void;
  selectedPlan: string | null;
}) {
  return (
    <>
      <div className="space-y-4">
        <Label htmlFor="Plans" className="flex items-center gap-x-2">
          Available Plans
        </Label>

        <PricingTable
          handleSelectPlan={handleSelectPlan}
          selectedPlan={selectedPlan}
        />
      </div>

      <Button
        disabled={isPending}
        type="submit"
        className="btn-style rgb-gradient gap-x-1 self-end"
      >
        Continue to Checkout&nbsp;
        {isPending ? (
          <Loader2Icon className="animate animate-spin" />
        ) : (
          <LogIn />
        )}
      </Button>
    </>
  );
});

const InputLabel = memo(function InputLabel() {
  return (
    <Label htmlFor="projectName" className="flex items-center gap-x-2">
      Project Name
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="flex aspect-square w-5 items-center justify-center rounded-full border bg-muted text-xs">
              i
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>The project this api key is created for.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Label>
  );
});
