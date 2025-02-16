import { SignInButton } from "@clerk/nextjs";

export default async function LandingPage() {
  return (
    <div>
      <SignInButton forceRedirectUrl={"/dashboard"} />
    </div>
  );
}
