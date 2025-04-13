import { auth } from "@clerk/nextjs/server";

import { HeaderInfo } from "@/components/ui/headerInfo";
import { PlanInfo } from "@/components/ui/PlansPage/planInfo";

import { getProjectInfo } from "@/lib/dataService";

import { PLAN } from "@/types";

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const projectId = (await params).projectId;

  const { getToken } = await auth();

  const token = await getToken();

  console.log("the token-->", token);

  if (!token) {
    throw new Error("Authentication Failed");
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
        currentPlan={projects.projectInfo[0].currentPlan as PLAN}
        expiryDate={projects.projectInfo[0].nextPaymentDate as number}
        billingDate={projects.projectInfo[0].currentBillingDate as number}
      />
    </div>
  );
}
