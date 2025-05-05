"use client";

import { useContext } from "react";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

import { PLAN, PROJECT_STATUS } from "@/types";

import { toast } from "@/hooks/use-toast";
import { cancelSubscription } from "@/lib/dataService";
import { ModalCtx } from "@/components/Providers/ModalProvider";

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

  const { openConfirmModal, closeModal } = useContext(ModalCtx);

  const { getToken } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      if (!token) return;

      await cancelSubscription(token, projectId);
    },

    onSuccess: () => {
      closeModal();
      toast({
        title: "Success",
        description: "Successfully cancelled subscription",
      });

      router.refresh();
    },

    onError: (error) => {
      closeModal();

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
          {currentPlan === PLAN.Free || sub_status === PROJECT_STATUS.Inactive
            ? "N/A"
            : new Date(billingDate).toDateString()}
        </p>
      </div>

      <div className="flex items-center justify-between space-y-1.5 text-sm font-medium">
        <p>Expiry Date</p>

        <p>
          {currentPlan === PLAN.Free || sub_status === PROJECT_STATUS.Inactive
            ? "N/A"
            : new Date(expiryDate).toDateString()}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-6">
        <Button
          asChild
          className="basis-1/2 rounded-sm disabled:cursor-not-allowed"
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
          title="Cancel Subscription"
          variant={"destructive"}
          onClick={() =>
            openConfirmModal({
              onConfirm: mutate,
              title: "Cancel Subscription",
              description: "Are you sure you want to cancel your subcription?",
            })
          }
          disabled={sub_status === PROJECT_STATUS.Inactive || isPending}
          className="basis-1/2 rounded-sm disabled:cursor-not-allowed"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
