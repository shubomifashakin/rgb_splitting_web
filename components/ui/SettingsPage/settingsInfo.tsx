"use client";

import { useContext, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";

import { Loader2Icon, Save, Trash } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HeaderInfo } from "@/components/ui/headerInfo";
import { ModalCtx } from "@/components/Providers/ModalProvider";

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

  const { openConfirmModal, closeModal } = useContext(ModalCtx);

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
      closeModal();
      router.push("/dashboard");
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

  function handleUpdateName(e: React.FormEvent) {
    e.preventDefault();

    if (newProjectName === projectName) return;

    mutate();
  }

  function handleDeleteProject(e: React.FormEvent) {
    e.preventDefault();

    openConfirmModal({
      title: "Delete Project",
      description: "Are you sure you want to delete this project?",
      onConfirm: () => mutateDeleteProject(),
    });
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
          title="Update Project Name"
          disabled={newProjectName === projectName || isUpdating || isDeleting}
          className="flex items-center gap-x-2 rounded-sm"
        >
          Save Changes{" "}
          {isUpdating ? <Loader2Icon className="animate-spin" /> : <Save />}
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
          title="Delete Project"
          variant={"destructive"}
          disabled={isDeleting || isUpdating}
          className="flex items-center gap-x-2 rounded-sm"
        >
          Delete Application{" "}
          {isDeleting ? <Loader2Icon className="animate-spin" /> : <Trash />}
        </Button>
      </form>
    </div>
  );
}
