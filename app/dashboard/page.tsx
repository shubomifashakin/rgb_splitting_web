import { auth } from "@clerk/nextjs/server";

import { ApiKeyTable } from "@/components/ui/apiTable";

import { apiKey } from "@/lib/types";

export default async function Page() {
  const { getToken } = await auth();

  const token = await getToken();

  //fetch the users tokens
  const req = await fetch(
    `https://psc34zajof.execute-api.us-east-1.amazonaws.com/prod/v1/keys/user1234`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const apiKeys = (await req.json()) as apiKey[];

  return (
    <div>
      <ApiKeyTable apiKeys={apiKeys} />
    </div>
  );
}
