import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const tiers = [
  {
    name: "Basic",
    price: 1,
    badge: "Starter",
    description: "Perfect for testing and small projects",
    features: [
      "200 requests per month",
      "2 requests per second",
      "5 burst limit",
    ],
    color:
      "bg-gradient-to-br from-red-300 to-red-100 dark:from-red-600 dark:to-red-900",
    buttonText: "Get Started",
    border: "border-red-400 shadow-lg",
  },
  {
    name: "Starter",
    price: 3,
    badge: "Popular",
    description: "Ideal for growing applications",
    features: [
      "600 requests per month",
      "5 requests per second",
      "10 burst limit",
    ],
    color:
      "bg-gradient-to-br from-green-300 to-green-100 dark:from-green-600 dark:to-green-900",
    buttonText: "Upgrade to Pro",
    popular: true,
    border: "border-green-400 shadow-lg",
  },
  {
    name: "Pro",
    price: 7,
    badge: "Advanced",
    description: "For high-performance needs",
    features: [
      "1,800 requests per month",
      "15 requests per second",
      "30 burst limit",
    ],
    color:
      "bg-gradient-to-br from-blue-300 to-blue-100 dark:from-blue-600 dark:to-blue-900",
    buttonText: "Contact Sales",
    border: "border-blue-400 shadow-lg",
  },
];

export function PricingTable({
  handleSelectPlan,
  selectedPlan,
}: {
  handleSelectPlan: (plan: string) => void;
  selectedPlan: string | null;
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
              className={`relative ${selectedPlan === tier.name ? tier.border : ""} transition-colors duration-150`}
            >
              <CardHeader
                className={`${tier.color} space-y-1 rounded-t-lg p-6`}
              >
                <Badge variant="secondary" className="mb-2 w-fit">
                  {tier.badge}
                </Badge>

                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl font-bold">{tier.name}</h3>

                  <div className="text-right">
                    <span className="text-2xl font-bold">${tier.price}</span>

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
                    <li key={feature} className="flex items-center gap-3">
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
}
