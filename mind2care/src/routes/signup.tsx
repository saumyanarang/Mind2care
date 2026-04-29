import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell, AuthInput, AuthButton } from "@/components/AuthShell";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign Up — Mind2Care" }] }),
  component: SignUp,
});

function SignUp() {
  return (
    <AuthShell
      title="Begin your journey"
      subtitle="A calmer mind starts with a single mindful step"
      footer={<>Already have an account? <Link to="/signin" className="text-primary font-medium">Sign in</Link></>}
    >
      <AuthInput label="Full name" placeholder="Aria Wells" />
      <AuthInput label="Email" type="email" placeholder="you@example.com" />
      <AuthInput label="Password" type="password" placeholder="At least 8 characters" />
      <AuthButton>Create Account</AuthButton>
    </AuthShell>
  );
}
