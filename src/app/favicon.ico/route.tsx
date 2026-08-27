import { ImageResponse } from "next/og";
import { getProfileImage } from "@/lib/settings";
import { Monogram } from "@/components/og/monogram";

export const dynamic = "force-dynamic";

const ICO_SIZE = 32;

function toIco(png: Uint8Array): Uint8Array<ArrayBuffer> {
  const buf = new Uint8Array(22 + png.length);
  const dv = new DataView(buf.buffer);
  dv.setUint16(0, 0, true);
  dv.setUint16(2, 1, true);
  dv.setUint16(4, 1, true);
  buf[6] = ICO_SIZE;
  buf[7] = ICO_SIZE;
  buf[8] = 0;
  buf[9] = 0;
  dv.setUint16(10, 1, true);
  dv.setUint16(12, 32, true);
  dv.setUint32(14, png.length, true);
  dv.setUint32(18, 22, true);
  buf.set(png, 22);
  return buf;
}

export async function GET() {
  const img = await getProfileImage();

  const resp = new ImageResponse(
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
            width={ICO_SIZE}
            height={ICO_SIZE}
            alt=""
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
        ) : (
          <Monogram size={ICO_SIZE} />
        )}
      </div>
    ),
    { width: ICO_SIZE, height: ICO_SIZE }
  );

  const png = new Uint8Array(await resp.arrayBuffer());
  return new Response(toIco(png), {
    headers: {
      "Content-Type": "image/x-icon",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
