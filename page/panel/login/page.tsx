"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type SyntheticEvent, useEffect, useState } from "react";
import { ArrowLeft, Eye, EyeOff, LogIn } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/redux/api/portfolioApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCredentials } from "@/redux/slices/authSlice";

export default function DashboardLoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthHydrated = useAppSelector((state) => state.auth.isHydrated);
  const token = useAppSelector((state) => state.auth.token);
  const [login, { isLoading }] = useLoginMutation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthHydrated && token) router.replace("/panel");
  }, [isAuthHydrated, router, token]);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await login(formState).unwrap();
      dispatch(setCredentials(response.data));
      toast.success("Signed in.");
      router.push("/panel");
    } catch {
      toast.error("Login failed. Check the backend server and admin credentials.");
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
              Portfolio Panel
            </p>
            <h1 className="mt-3 text-2xl font-semibold">Panel Login</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage portfolio content from the Next backend.
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
              <div className="relative">
                <Input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  value={formState.password}
                  placeholder="Password"
                  onChange={(event) =>
                    setFormState((current) => ({
                      ...current,
                      password: event.target.value,
                    }))
                  }
                  className="h-11 bg-background/50 pr-11"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 size-9 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={
                    isPasswordVisible ? "Hide password" : "Show password"
                  }
                  title={isPasswordVisible ? "Hide password" : "Show password"}
                  onClick={() => setIsPasswordVisible((current) => !current)}
                >
                  {isPasswordVisible ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

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
