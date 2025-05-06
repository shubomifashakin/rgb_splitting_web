"use client";

import { memo, useCallback, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useUser } from "@clerk/nextjs";

import { useMutation } from "@tanstack/react-query";

import { Loader2Icon, LogIn } from "lucide-react";

import { Label } from "../label";
import { Input } from "../input";
import { Button } from "../button";
import { PricingTable } from "../plans";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

import { toast } from "@/hooks/use-toast";
import { triggerPayment } from "@/lib/dataService";

import { PaymentPlan } from "@/types";

export function NewProjectForm({ plans }: { plans: PaymentPlan[] }) {
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
      projectId: projectId ? projectId : null,
      email: user.emailAddresses[0].emailAddress,
      fullName: `${user.firstName} ${user.lastName}`,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-y-4">
      <div className="space-y-2">
        <InputLabel />

        <Input
          minLength={5}
          maxLength={50}
          id="projectName"
          value={projectName}
          disabled={oldProjectName ? true : false}
          onChange={(e) => setProjectName(e.target.value)}
        />

        <small className="block text-right text-xs">
          ~&nbsp;Max. 50 Characters.
        </small>
      </div>

      <BottomHalf
        plans={plans}
        isPending={isPending}
        selectedPlan={selectedPlan}
        handleSelectPlan={handleSelectPlan}
      />
    </form>
  );
}

const BottomHalf = memo(function BottomHalf({
  plans,
  isPending,
  selectedPlan,
  handleSelectPlan,
}: {
  isPending: boolean;
  plans: PaymentPlan[];
  selectedPlan: string | null;
  handleSelectPlan: (s: string) => void;
}) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="Plans" className="flex items-center gap-x-2">
          Available Plans
        </Label>

        <PricingTable
          plans={plans}
          selectedPlan={selectedPlan}
          handleSelectPlan={handleSelectPlan}
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        title="Continue to Checkout"
        className="gap-x-1 self-end rounded-sm"
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
      Application Name
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="flex aspect-square w-5 items-center justify-center rounded-full border bg-muted text-xs">
              i
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>The application this api key is created for.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Label>
  );
});
