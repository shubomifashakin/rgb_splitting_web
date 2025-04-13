import { apiKeyInfo, PLAN, PROJECT_STATUS } from "../types";

const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL!;

export async function triggerPayment({
  projectName,
  selectedPlan,
  email,
  userId,
  fullName,
  projectId,
}: {
  projectName: string;
  selectedPlan: string;
  email: string;
  userId: string;
  fullName?: string;
  projectId?: string;
}) {
  const req = await fetch(`${baseApiUrl}/v1/trigger-payment`, {
    method: "POST",
    body: JSON.stringify({
      email,
      userId,
      fullName,
      projectId,
      projectName,
      planName: selectedPlan,
    }),
  });

  if (!req.ok) {
    const error = await req.json();

    throw new Error(error.message);
  }

  const data = (await req.json()) as {
    status: string;
    message: string;
    data?: {
      link: string;
    };
  };

  return data;
}

export async function getUsersProjects(token: string) {
  const req = await fetch(`${baseApiUrl}/v1/projects`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "force-cache",
    mode: "cors",
  });

  const apiKeys = (await req.json()) as apiKeyInfo[];
  return apiKeys;
}

export async function getProjectInfo(
  token: string,
  projectId: string,
  searchParams: {
    field: "plans" | "apikey" | "gallery" | "settings";
  },
) {
  const url = new URL(`${baseApiUrl}/v1/${projectId}`);

  url.searchParams.append("field", searchParams.field);

  const req = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  });

  if (!req.ok) {
    const error = await req.json();
    console.log(error);
    throw new Error("An error occurred");
  }

  const data = (await req.json()) as {
    projectInfo: {
      projectName: string;
      sub_status: PROJECT_STATUS;

      imageId: string;
      createdAt: number;
      originalImageUrl: string;

      currentPlan: PLAN;
      nextPaymentDate: number;
      currentBillingDate: number;

      apiKey: string;
    }[];
  };

  return data;
}

export async function updateProjectName(
  token: string,
  projectId: string,
  newProjectName: string,
) {
  const req = await fetch(`${baseApiUrl}/v1/${projectId}/update`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      projectName: newProjectName,
    }),
  });

  if (!req.ok) {
    const error = await req.json();

    throw new Error(error.Message || error.message || "Internal Server Error");
  }

  const data = await req.json();

  return data;
}

export async function deleteProject(token: string, projectId: string) {
  const req = await fetch(`${baseApiUrl}/v1/${projectId}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!req.ok) {
    const error = await req.json();

    throw new Error(error.Message || error.message || "Internal Server Error");
  }

  console.log("hello world");
  const data = await req.json();

  return data;
}

export async function cancelSubscription(token: string, projectId: string) {
  const req = await fetch(`${baseApiUrl}/v1/${projectId}/cancel`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!req.ok) {
    const error = await req.json();

    throw new Error(error.Message || error.message || "Internal Server Error");
  }

  const data = await req.json();

  return data;
}
