import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { AppProps } from "next/app";
import { CryptoProvider } from "@/context/CryptoContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CryptoProvider>
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </CryptoProvider>
    </>
  );
}
