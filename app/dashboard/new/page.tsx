"use client";

import dynamic from "next/dynamic";

//paystack uses the window object to work, hence the need for the ssr: false
const DynamicComponentWithNoSSR = dynamic(
  () => import("@/components/ui/newPage"),
  {
    ssr: false,
  },
);

export default function NewPage() {
  return <DynamicComponentWithNoSSR />;
}
