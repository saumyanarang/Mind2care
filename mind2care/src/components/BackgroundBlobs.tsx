export function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="blob animate-blob" style={{ background: "var(--coral)", width: 480, height: 480, top: -120, left: -120 }} />
      <div className="blob animate-blob" style={{ background: "var(--purple)", width: 520, height: 520, top: "30%", right: -150, animationDelay: "4s" }} />
      <div className="blob animate-blob" style={{ background: "var(--turquoise)", width: 460, height: 460, bottom: -150, left: "20%", animationDelay: "8s" }} />
      <div className="blob animate-blob" style={{ background: "var(--pink)", width: 380, height: 380, top: "60%", left: "5%", animationDelay: "12s", opacity: 0.35 }} />
    </div>
  );
}
