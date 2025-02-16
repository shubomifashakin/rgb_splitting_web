"use client";

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
import { LogIn } from "lucide-react";
import { useState } from "react";

export default function NewKeyPage() {
  const [selectedPlan, setPlan] = useState("");

  return (
    <div>
      <h1 className="text-xl font-medium">Create A New App</h1>

      <form className="mt-4 flex flex-col gap-y-4">
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

          <Input id="projectName" maxLength={50} minLength={5} />

          <small className="block text-right text-xs">
            ~&nbsp;Max. 50 Characters.
          </small>
        </div>

        <div className="space-y-4">
          <Label htmlFor="Plans" className="flex items-center gap-x-2">
            Available Plans
          </Label>

          <PricingTable />
        </div>

        <Button
          type="submit"
          className="btn-style rgb-gradient gap-x-1 self-end"
        >
          Continue to Checkout <LogIn />
        </Button>
      </form>
    </div>
  );
}
