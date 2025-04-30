import { auth } from "@clerk/nextjs/server";

import { HeaderInfo } from "@/components/ui/headerInfo";
import { SettingsInfo } from "@/components/ui/SettingsPage/settingsInfo";

import { getProjectInfo } from "@/lib/dataService";

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const projectId = (await params).projectId;

  const { getToken } = await auth();

  const token = await getToken();

  if (!token) {
    throw new Error("Authentication Failed");
  }

  const projects = await getProjectInfo(token, projectId, {
    field: "settings",
  });

  return (
    <div className="space-y-4">
      <HeaderInfo
        title="Settings"
        description="Configure your settings for this application."
      />

      <SettingsInfo projectName={projects.projectInfo[0].projectName} />
    </div>
  );
}
