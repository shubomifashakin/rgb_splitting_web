import { auth } from "@clerk/nextjs/server";

import { HeaderInfo } from "@/components/ui/headerInfo";
import { PlanInfo } from "@/components/ui/PlansPage/planInfo";

import { getProjectInfo } from "@/lib/dataService";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const projectId = (await params).projectId;

  const { getToken } = await auth();

  const token = await getToken();

  if (!token) {
    redirect("/auth");
  }

  const projects = await getProjectInfo(token, projectId, { field: "plans" });

  return (
    <div className="space-y-6">
      <HeaderInfo
        title="Plans & Billing"
        description="Your subscription plan and billing details."
      />

      <PlanInfo
        sub_status={projects.projectInfo[0].sub_status}
        projectName={projects.projectInfo[0].projectName}
        currentPlan={projects.projectInfo[0].currentPlan}
        expiryDate={projects.projectInfo[0].nextPaymentDate}
        billingDate={projects.projectInfo[0].currentBillingDate}
      />
    </div>
  );
}
