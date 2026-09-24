import Link from "next/link";
import AuthStatus from "@/components/auth/AuthStatus";
import SignInForm from "@/components/auth/SignInForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-xl font-semibold">Sign in</h1>
      <AuthStatus />
      <SignInForm />
      <Link href="/signup">Need an account? Sign up</Link>
    </main>
  );
}