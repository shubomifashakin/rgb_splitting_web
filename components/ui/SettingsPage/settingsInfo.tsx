"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";

import { Loader2Icon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HeaderInfo } from "@/components/ui/headerInfo";

import { toast } from "@/hooks/use-toast";

import { deleteProject, updateProjectName } from "@/lib/dataService";

export function SettingsInfo({ projectName }: { projectName: string }) {
  const [newProjectName, setProjectName] = useState(projectName);
  const params = useParams<{ projectId: string }>();
  const router = useRouter();

  const { getToken } = useAuth();

  const { mutate, isPending: isUpdating } = useMutation({
    mutationKey: ["update-project-name", params.projectId],

    mutationFn: async () => {
      const token = await getToken();

      if (!token) {
        return;
      }

      const projectId = params.projectId;

      await updateProjectName(token, projectId, newProjectName);
    },

    onSuccess: () => {
      console.log("Project name updated successfully");
      window.location.reload();
    },

    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { mutate: mutateDeleteProject, isPending: isDeleting } = useMutation({
    mutationKey: ["delete-project", params.projectId],

    mutationFn: async () => {
      const token = await getToken();

      if (!token) {
        return;
      }

      const projectId = params.projectId;

      await deleteProject(token, projectId);
    },

    onSuccess: () => {
      console.log("Project deleted successfully");
      router.push("/dashboard");
    },

    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  function handleUpdateName(e: React.FormEvent) {
    e.preventDefault();

    if (newProjectName === projectName) return;

    mutate();
  }

  function handleDeleteProject(e: React.FormEvent) {
    e.preventDefault();

    mutateDeleteProject();
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleUpdateName}
        className="space-y-4 rounded-sm border bg-muted px-3 py-4"
      >
        <div className="space-y-2 capitalize">
          <h1 className="text-sm">Project Name</h1>

          <Input
            type="text"
            value={newProjectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="bg-white capitalize dark:bg-black"
          />
        </div>

        <Button
          disabled={newProjectName === projectName || isUpdating || isDeleting}
          className="rgb-gradient btn-style flex items-center gap-x-2 rounded-sm"
        >
          Save Changes {isUpdating && <Loader2Icon className="animate-spin" />}
        </Button>
      </form>

      <form
        onSubmit={handleDeleteProject}
        className="space-y-4 rounded-sm border bg-muted px-3 py-4"
      >
        <HeaderInfo
          title="Danger Zone"
          description="The following action is destructive and cannot be reversed."
        />

        <Button
          disabled={isDeleting || isUpdating}
          variant={"destructive"}
          className="flex items-center gap-x-2 rounded-sm"
        >
          Delete Application{" "}
          {isDeleting && <Loader2Icon className="animate-spin" />}
        </Button>
      </form>
    </div>
  );
}
