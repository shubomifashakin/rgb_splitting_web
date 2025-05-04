import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import { HeaderInfo } from "@/components/ui/headerInfo";
import { ApiKeyInfo } from "@/components/ui/ApiKeysPage/apiKeyInfo";

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
    redirect("/auth");
  }

  const projects = await getProjectInfo(token, projectId, { field: "apikey" });

  return (
    <div className="space-y-4">
      <HeaderInfo
        title="API Keys"
        description="Find the API key for your project below."
      />

      <ApiKeyInfo apiKey={projects.projectInfo[0].apiKey} />
    </div>
  );
}
