import { memo } from "react";

import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { PaymentPlan } from "@/types";

const tiers = [
  {
    name: "Free",
    badge: "Starter",
    description: "Perfect for testing and small applications",
    features: [
      "200 requests per month",
      "Max Image size 10mb",
      "1 processed image",
    ],
    color:
      "bg-gradient-to-br from-red-300 to-red-100 dark:from-red-600 dark:to-red-900",
    border: "border-red-400 shadow-lg",
  },
  {
    name: "Pro",
    badge: "Popular",
    description: "Ideal for growing applications",
    features: [
      "1000 requests per month",
      "Max image size 20mb",
      "3 processed images",
    ],
    color:
      "bg-gradient-to-br from-green-300 to-green-100 dark:from-green-600 dark:to-green-900",
    popular: true,
    border: "border-green-400 shadow-lg",
  },
  {
    name: "Executive",
    badge: "Advanced",
    description: "For high-performance needs",
    features: [
      "2,500 requests per month",
      "Max image size 50mb",
      "3 processed images",
    ],
    color:
      "bg-gradient-to-br from-blue-300 to-blue-100 dark:from-blue-600 dark:to-blue-900",
    border: "border-blue-400 shadow-lg",
  },
];

export const PricingTable = memo(function PricingTable({
  plans,
  selectedPlan,
  handleSelectPlan,
}: {
  plans: PaymentPlan[];
  selectedPlan: string | null;
  handleSelectPlan: (plan: string) => void;
}) {
  return (
    <div>
      <div className="mx-auto grid max-w-6xl gap-8 overflow-hidden md:grid-cols-2 lg:grid-cols-3">
        {tiers.map((tier) => (
          <button
            type="button"
            key={tier.name}
            onClick={() => handleSelectPlan(tier.name)}
          >
            <Card
              className={`relative ${selectedPlan === tier.name ? tier.border : ""} rounded-sm transition-colors duration-150`}
            >
              <CardHeader
                className={`${tier.color} space-y-1 rounded-t-sm p-6`}
              >
                <Badge variant="secondary" className="mb-2 w-fit">
                  {tier.badge}
                </Badge>

                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl font-bold">{tier.name}</h3>

                  <div className="text-right">
                    <span className="text-2xl font-bold">
                      $
                      {tier.name === "Free"
                        ? 0
                        : plans.find((plan) => plan.name === tier.name)?.amount}
                    </span>

                    <span className="text-muted-foreground">/mo</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  {tier.description}
                </p>
              </CardHeader>

              <CardContent className="p-6">
                <ul className="space-y-4">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm"
                    >
                      <Check className="h-5 w-5 flex-shrink-0 text-green-500" />

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
});
