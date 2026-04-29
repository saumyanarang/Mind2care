import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell, AuthInput, AuthButton } from "@/components/AuthShell";

export const Route = createFileRoute("/signin")({
  head: () => ({ meta: [{ title: "Sign In — Mind2Care" }] }),
  component: SignIn,
});

function SignIn() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue your wellness journey"
      footer={<>New here? <Link to="/signup" className="text-primary font-medium">Create an account</Link></>}
    >
      <AuthInput label="Email" type="email" placeholder="you@example.com" />
      <AuthInput label="Password" type="password" placeholder="••••••••" />
      <div className="text-right -mt-2">
        <Link to="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</Link>
      </div>
      <AuthButton>Sign In</AuthButton>
    </AuthShell>
  );
}
