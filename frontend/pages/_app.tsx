import "@styles/globals.css";
import { theme } from "@theme";
import { ThemeProvider } from "@material-tailwind/react";
import type { AppProps } from "next/app";
import { Navbar } from "@components/navbar";
import { SWRConfig } from "swr";
import { fetcher } from "@utils";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <ThemeProvider value={theme}>
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </SWRConfig>
  );
}
