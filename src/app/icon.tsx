import { ImageResponse } from "next/og";
import { getProfileImage } from "@/lib/settings";
import { Monogram } from "@/components/og/monogram";

export const dynamic = "force-dynamic";

export default async function Icon(): Promise<Response> {
  const img = await getProfileImage();

  if (img) {
    const data = Buffer.from(img.base64, "base64");
    return new Response(new Uint8Array(data), {
      headers: {
        "Content-Type": img.mime,
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  return new ImageResponse(<Monogram size={256} />, {
    width: 256,
    height: 256,
  });
}
