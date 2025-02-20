import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";



const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0" />
            </Head>
            <div className={inter.className}>
                <Component {...pageProps} />
            </div>
        </>
    );
}