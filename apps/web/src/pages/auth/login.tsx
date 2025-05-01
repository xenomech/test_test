"use client";
import { LoginForm } from "@/components/auth/login-form";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function Login() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/app");
    }
  }, [isAuthenticated, router]);
  return <LoginForm />;
}
