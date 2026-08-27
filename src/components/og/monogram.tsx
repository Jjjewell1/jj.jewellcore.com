export function Monogram({ size }: { size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #22d3ee, #3b82f6)",
        color: "#ffffff",
        fontSize: size * 0.38,
        fontWeight: 700,
        fontFamily: "sans-serif",
      }}
    >
      JJ
    </div>
  );
}
