import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { User, Bell, Shield, Palette, Download, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — Mind2Care" }] }),
  component: Settings,
});

const sections = [
  { key: "profile", label: "Profile", icon: User, color: "coral" },
  { key: "notifications", label: "Notifications", icon: Bell, color: "purple" },
  { key: "privacy", label: "Privacy", icon: Shield, color: "blue" },
  { key: "appearance", label: "Appearance", icon: Palette, color: "turquoise" },
] as const;

function Toggle({ label, defaultOn = false }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm">{label}</span>
      <button onClick={() => setOn(!on)} className={`w-11 h-6 rounded-full transition-all ${on ? "gradient-primary" : "bg-muted"}`}>
        <motion.div animate={{ x: on ? 22 : 2 }} className="h-5 w-5 rounded-full bg-white shadow-soft" />
      </button>
    </div>
  );
}

function Settings() {
  const [active, setActive] = useState<string>("profile");

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Customize Mind2Care to feel like home." accent="blue" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="glass rounded-3xl p-3 shadow-card h-fit">
          {sections.map((s) => {
            const Icon = s.icon;
            const isActive = active === s.key;
            return (
              <button
                key={s.key}
                onClick={() => setActive(s.key)}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left text-sm font-medium transition-all ${isActive ? "shadow-soft" : "hover:bg-muted"}`}
                style={isActive ? { background: `var(--${s.color})`, color: `var(--${s.color}-foreground)` } : {}}
              >
                <Icon className="h-4 w-4" /> {s.label}
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-3 glass rounded-3xl p-6 shadow-card">
          {active === "profile" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <h3 className="font-semibold text-lg">Your profile</h3>
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full gradient-coral-pink flex items-center justify-center text-3xl font-bold text-white shadow-glow">A</div>
                <div>
                  <button className="px-4 py-2 rounded-xl glass text-sm font-medium shadow-soft">Change avatar</button>
                  <p className="text-xs text-muted-foreground mt-2">JPG or PNG, max 2MB</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block"><span className="text-sm font-medium">Full name</span><input defaultValue="Aria Wells" className="mt-1.5 w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border outline-none focus:border-primary" /></label>
                <label className="block"><span className="text-sm font-medium">Email</span><input defaultValue="aria@mind2care.app" className="mt-1.5 w-full px-4 py-2.5 rounded-xl bg-muted/50 border border-border outline-none focus:border-primary" /></label>
                <label className="block md:col-span-2"><span className="text-sm font-medium">Bio</span><textarea rows={3} defaultValue="On a gentle journey toward calmer days." className="mt-1.5 w-full p-4 rounded-xl bg-muted/50 border border-border outline-none focus:border-primary resize-none" /></label>
              </div>
              <button className="px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold shadow-glow">Save changes</button>
            </motion.div>
          )}
          {active === "notifications" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="divide-y divide-border">
              <h3 className="font-semibold text-lg pb-4">Notification preferences</h3>
              <Toggle label="Daily mood reminder" defaultOn />
              <Toggle label="Quote of the day" defaultOn />
              <Toggle label="Challenge reminders" defaultOn />
              <Toggle label="Community replies" />
              <Toggle label="Weekly insights email" defaultOn />
            </motion.div>
          )}
          {active === "privacy" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h3 className="font-semibold text-lg">Privacy controls</h3>
              <div className="divide-y divide-border">
                <Toggle label="Default to anonymous in community" defaultOn />
                <Toggle label="Allow data for personalized insights" defaultOn />
                <Toggle label="Show my growth stats publicly" />
              </div>
              <div className="grid sm:grid-cols-2 gap-3 pt-4">
                <button className="px-4 py-3 rounded-xl glass shadow-soft flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"><Download className="h-4 w-4" /> Export my data</button>
                <button className="px-4 py-3 rounded-xl bg-coral text-coral-foreground shadow-soft flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"><Trash2 className="h-4 w-4" /> Delete account</button>
              </div>
            </motion.div>
          )}
          {active === "appearance" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <h3 className="font-semibold text-lg">Appearance</h3>
              <div>
                <div className="text-sm font-medium mb-2">Theme</div>
                <div className="grid grid-cols-3 gap-3">
                  {["Light", "Dark", "Auto"].map((t) => (
                    <button key={t} className="p-4 rounded-2xl glass shadow-soft hover:shadow-glow transition-all">{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-2">Font size</div>
                <input type="range" min="12" max="20" defaultValue="16" className="w-full accent-primary" />
              </div>
              <div className="divide-y divide-border">
                <Toggle label="Compact mode" />
                <Toggle label="Reduce animations" />
                <Toggle label="High contrast" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
