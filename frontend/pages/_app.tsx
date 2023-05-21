import "@styles/globals.css";
import { theme } from "@theme";
import { ThemeProvider } from "@material-tailwind/react";
import type { AppProps } from "next/app";
import { Navbar } from "@components/navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider value={theme}>
      <Navbar />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
