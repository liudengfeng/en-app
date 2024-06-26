import type { NextRequest } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  let responseText = "Hello World";

  // In the edge runtime you can use Bindings that are available in your application
  // (for more details see:
  //    - https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/#use-bindings-in-your-nextjs-application
  //    - https://developers.cloudflare.com/pages/functions/bindings/
  // )
  //
  // KV Example:
  const myKv = getRequestContext().env.EN_WORDS;
  // const key = `(Good) morning`;
  const key = `ANC`;
  const kvValueString = await myKv.get(key);
  console.log(kvValueString);
  const kvValue = kvValueString ? JSON.parse(kvValueString) : {};
  return new Response(
    `The value of kvTest in ${key} is: ${JSON.stringify(kvValue)}`
  );
}
