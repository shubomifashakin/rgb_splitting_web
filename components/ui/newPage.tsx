"use client";

import { useState } from "react";

import { useMutation } from "@tanstack/react-query";

import PaystackPop from "@paystack/inline-js";

import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PricingTable } from "@/components/ui/plans";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function NewKeyPage() {
  const [selectedPlan, setPlan] = useState<null | string>(null);
  const [projectName, setProjectName] = useState("");

  const { mutate, isPending } = useMutation({
    mutationKey: ["plans"],

    mutationFn: async function () {
      console.log("hello");
      const req = await fetch(
        "https://71pqwiz46d.execute-api.us-east-1.amazonaws.com/prod/v1/trigger-payment",
      );

      if (!req.ok) {
        const error = await req.json();

        throw new Error(error.message);
      }

      const data = (await req.json()) as {
        status: boolean;
        message: string;
        data: {
          authorization_url: string;
          access_code: string;
          reference: string;
        };
      };

      console.log(data);

      const popup = new PaystackPop();
      popup.resumeTransaction({ accessCode: data.data.access_code });
    },

    onError: (error: unknown) => {
      console.log(error, "hey");
    },

    onSuccess: (data) => {
      console.log(data, "yh");
    },
  });

  function handleSelectPlan(plan: string) {
    setPlan(plan);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedPlan || !projectName) return;

    mutate();
  }

  return (
    <div>
      <h1 className="text-xl font-medium">Create A New App</h1>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="projectName" className="flex items-center gap-x-2">
            Project Name
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex aspect-square w-5 items-center justify-center rounded-full border bg-muted text-xs">
                    i
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>The Project this api key is primarily used for.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>

          <Input
            id="projectName"
            maxLength={50}
            minLength={5}
            onChange={(e) => setProjectName(e.target.value)}
          />

          <small className="block text-right text-xs">
            ~&nbsp;Max. 50 Characters.
          </small>
        </div>

        <div className="space-y-4">
          <Label htmlFor="Plans" className="flex items-center gap-x-2">
            Available Plans
          </Label>

          <PricingTable
            handleSelectPlan={handleSelectPlan}
            selectedPlan={selectedPlan}
          />
        </div>

        <Button
          disabled={isPending}
          type="submit"
          className="btn-style rgb-gradient gap-x-1 self-end"
        >
          Continue to Checkout <LogIn />
        </Button>
      </form>
    </div>
  );
}
