import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell, AuthInput, AuthButton } from "@/components/AuthShell";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot Password — Mind2Care" }] }),
  component: Forgot,
});

function Forgot() {
  return (
    <AuthShell
      title="Reset your password"
      subtitle="We'll send a gentle reset link to your inbox"
      footer={<>Remembered? <Link to="/signin" className="text-primary font-medium">Sign in</Link></>}
    >
      <AuthInput label="Email" type="email" placeholder="you@example.com" />
      <AuthButton>Send Reset Link</AuthButton>
    </AuthShell>
  );
}
