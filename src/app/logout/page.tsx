import Link from "next/link";
import AuthStatus from "@/components/auth/AuthStatus";
import SignOutButton from "@/components/auth/SignOutButton";

export default function LogoutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-xl font-semibold">Sign out</h1>
      <AuthStatus />
      <SignOutButton />
      <Link href="/login">Back to sign in</Link>
    </main>
  );
}