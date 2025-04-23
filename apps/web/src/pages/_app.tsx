import type { AppProps } from "next/app";
import "@workspace/ui/globals.css";
import { ThemeProvider } from "@workspace/ui/provider/theme-provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
