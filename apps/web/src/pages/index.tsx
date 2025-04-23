"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { useTheme } from "@workspace/ui/hooks/use-theme";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme}
      </Button>
    </div>
  );
}
