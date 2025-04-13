"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

import { PLAN, PROJECT_STATUS } from "@/types";

import { toast } from "@/hooks/use-toast";
import { cancelSubscription } from "@/lib/dataService";

export function PlanInfo({
  currentPlan,
  billingDate,
  expiryDate,
  sub_status,
  projectName,
}: {
  currentPlan: PLAN;
  expiryDate: number;
  projectName: string;
  billingDate: number;
  sub_status: PROJECT_STATUS;
}) {
  const params = useParams<{ projectId: string }>();
  const projectId = params.projectId;
  const router = useRouter();

  const { getToken } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      if (!token) return;

      await cancelSubscription(token, projectId);
    },

    onSuccess: () => {
      toast({
        title: "Success",
        description: "Successfully cancelled subscription",
      });

      router.refresh();
    },

    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="w-full space-y-4 rounded-sm border bg-muted p-4">
      <div className="flex items-center justify-between space-y-1.5 text-sm font-medium">
        <p>Current Plan</p>

        <p className="capitalize tracking-wide">{currentPlan}</p>
      </div>

      <div className="flex items-center justify-between space-y-1.5 text-sm font-medium">
        <p>Subscription Status</p>

        <p className="capitalize tracking-wide">{sub_status.split("-")[0]}</p>
      </div>

      <div className="flex items-center justify-between space-y-1.5 text-sm font-medium">
        <p>Billing Date</p>

        <p>
          {currentPlan === PLAN.Free
            ? "N/A"
            : new Date(billingDate).toDateString()}
        </p>
      </div>

      <div className="flex items-center justify-between space-y-1.5 text-sm font-medium">
        <p>Expiry Date</p>

        <p>
          {currentPlan === PLAN.Free
            ? "N/A"
            : new Date(expiryDate).toDateString()}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-6">
        <Button
          asChild
          className="rgb-gradient btn-style basis-1/2 rounded-sm disabled:cursor-not-allowed"
        >
          <Link
            href={{
              pathname: "/dashboard/new",
              query: { projectId, projectName },
            }}
          >
            Upgrade
          </Link>
        </Button>

        <Button
          variant={"destructive"}
          onClick={() => mutate()}
          disabled={sub_status === PROJECT_STATUS.Inactive || isPending}
          className="basis-1/2 rounded-sm disabled:cursor-not-allowed"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
