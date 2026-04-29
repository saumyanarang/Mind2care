import { motion } from "framer-motion";

export function PageHeader({ title, subtitle, accent = "coral" }: { title: string; subtitle?: string; accent?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: `var(--${accent})` }} />
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Mind2Care</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-2 text-muted-foreground max-w-2xl">{subtitle}</p>}
    </motion.div>
  );
}
