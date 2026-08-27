import { ImageResponse } from "next/og";
import { getProfileImage } from "@/lib/settings";
import { Monogram } from "@/components/og/monogram";

export const dynamic = "force-dynamic";

export const alt = "Jeffrey JJ Jewell - IT Professional & Cybersecurity Student";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const img = await getProfileImage();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          background: "#0d1117",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            flex: "1 1 0%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {img ? (
            // eslint-disable-next-line @next/next/no-img-element -- ImageResponse requires a raw <img> element
            <img
              src={`data:${img.mime};base64,${img.base64}`}
              width={220}
              height={220}
              alt="Jeffrey JJ Jewell"
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
          ) : (
            <Monogram size={220} />
          )}
        </div>
        <div
          style={{
            flex: "1.5 1 0%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingRight: 72,
          }}
        >
          <div style={{ fontSize: 68, fontWeight: 700, letterSpacing: -1 }}>
            Jeffrey JJ Jewell
          </div>
          <div style={{ fontSize: 34, color: "#a1a1aa", marginTop: 12 }}>
            IT Professional &amp; Cybersecurity Student
          </div>
          <div
            style={{
              width: 120,
              height: 8,
              borderRadius: 4,
              background: "linear-gradient(90deg, #22d3ee, #3b82f6)",
              marginTop: 24,
            }}
          />
          <div style={{ fontSize: 24, color: "#71717a", marginTop: 24 }}>
            jj.jewellcore.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
