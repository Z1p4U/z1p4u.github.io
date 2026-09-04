"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type SyntheticEvent, useState } from "react";
import { ArrowLeft, LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/redux/api/portfolioApi";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/slices/authSlice";

export default function DashboardLoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await login(formState).unwrap();
      dispatch(setCredentials(response.data));
      router.push("/dashboard");
    } catch {
      setError("Login failed. Check the backend server and admin credentials.");
    }
  };

  return (
    <main className="min-h-screen bg-background px-6 py-8 text-foreground">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>

        <div className="rounded-xl border border-border/60 bg-secondary/30 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.25)]">
          <div className="mb-8">
            <p className="text-xs font-mono uppercase tracking-[0.24em] text-primary">
              Portfolio Admin
            </p>
            <h1 className="mt-3 text-2xl font-semibold">Dashboard Login</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage portfolio content from the Laravel API.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formState.email}
                placeholder="admin@example.com"
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                className="h-11 bg-background/50"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formState.password}
                placeholder="Password"
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
                className="h-11 bg-background/50"
                required
              />
            </div>

            {error ? (
              <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </p>
            ) : null}

            <Button type="submit" disabled={isLoading} className="h-11 w-full">
              <LogIn className="h-4 w-4" />
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
