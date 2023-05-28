import "@styles/globals.css";
import { theme } from "@theme";
import { ThemeProvider } from "@material-tailwind/react";
import type { AppProps } from "next/app";
import { Navbar } from "@components/navbar";
import { SWRConfig } from "swr";
import { fetcher } from "@utils";
import AuthProvider from "@context/auth";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <ThemeProvider value={theme}>
        <AuthProvider>
          <Navbar />
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </SWRConfig>
  );
}
