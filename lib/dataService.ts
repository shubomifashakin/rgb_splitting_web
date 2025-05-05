import { Projects, ProjectInfo, ProcessedImages } from "../types";

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
  projectId?: string | null;
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

export async function getUsersProjects(token: string, query?: string) {
  const url = new URL(`${baseApiUrl}/v1/projects`);

  if (query) {
    url.searchParams.append("query", query);
  }

  const req = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const projects = (await req.json()) as Projects;

  return projects;
}

export async function getProjectInfo(
  token: string,
  projectId: string,
  searchParams: {
    field: "plans" | "apikey" | "gallery" | "settings";
    query?: string;
  },
) {
  const url = new URL(`${baseApiUrl}/v1/${projectId}`);

  url.searchParams.append("field", searchParams.field);

  if (searchParams.query) {
    url.searchParams.append("query", searchParams.query);
  }

  const req = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  });

  if (!req.ok) {
    throw new Error("Something went wrong.");
  }

  const data = (await req.json()) as ProjectInfo;

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

export async function getProcessedImages(
  token: string,
  projectId: string,
  imageId: string,
) {
  console.log("projectId", projectId, "imageId", imageId);

  const req = await fetch(
    `${baseApiUrl}/v1/${projectId}/web/image/${imageId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!req.ok) {
    const error = await req.json();

    throw new Error(error.Message || error.message || "Internal Server Error");
  }

  const res = await req.json();

  return res as ProcessedImages;
}
