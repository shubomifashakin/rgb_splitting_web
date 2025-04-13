"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@clerk/nextjs";

export default function Page() {
  const user = useAuth();
  const router = useRouter();

  useEffect(
    function () {
      if (user.isLoaded && !user.isSignedIn) {
        router.push("/auth");
      }

      if (user.isLoaded && user.isSignedIn) {
        router.push("/dashboard");
      }
    },
    [user, router],
  );

  function handleRedirect() {
    if (user.isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/auth");
    }
  }

  return (
    <main className="p-2">
      <p>Redirecting...</p>

      {user.isLoaded && (
        <p className="text-sm">
          If not redirected, please{" "}
          <button onClick={handleRedirect}>click here..</button>
        </p>
      )}
    </main>
  );
}
