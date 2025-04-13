import { SignIn } from "@clerk/nextjs";

export default async function SignInPage() {
  return (
    <main className="flex h-dvh w-full items-center justify-center">
      <SignIn fallbackRedirectUrl={"/dashboard"} />
    </main>
  );
}
