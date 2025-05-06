import { Suspense } from "react";

import { HeaderInfo } from "@/components/ui/headerInfo";
import { NewProjectForm } from "@/components/ui/New_Application/Application";

import { PaymentPlansResponse } from "@/types";

export default async function Page() {
  const getAllPlansOnPaymentGatewayReq = await fetch(
    "https://api.flutterwave.com/v3/payment-plans?status=active",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!getAllPlansOnPaymentGatewayReq.ok) {
    throw new Error(`Internal Server Error`);
  }

  const allPlansInPaymentGateway =
    (await getAllPlansOnPaymentGatewayReq.json()) as PaymentPlansResponse;

  return (
    <div className="space-y-4">
      <HeaderInfo
        title="Create A New App"
        description="A new application will be created with the plan you select."
      />

      <Suspense>
        <NewProjectForm plans={allPlansInPaymentGateway.data} />
      </Suspense>
    </div>
  );
}
