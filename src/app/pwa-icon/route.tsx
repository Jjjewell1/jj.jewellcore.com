import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getProfileImage } from "@/lib/settings";
import { Monogram } from "@/components/og/monogram";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const size = Math.min(
    Math.max(Number(req.nextUrl.searchParams.get("size")) || 192, 16),
    512
  );
  const img = await getProfileImage();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d1117",
        }}
      >
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element -- ImageResponse requires a raw <img> element
          <img
            src={`data:${img.mime};base64,${img.base64}`}
            width={Math.round(size * 0.9)}
            height={Math.round(size * 0.9)}
            alt=""
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
        ) : (
          <Monogram size={Math.round(size * 0.9)} />
        )}
      </div>
    ),
    { width: size, height: size }
  );
}
