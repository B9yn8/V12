import { Toaster } from "@/components/ui/toaster";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import { extractRouterConfig } from "uploadthing/server";
import { fileRouter } from "./api/uploadthing/core";
import "./globals.css";
import ReactQueryProvider from "./ReactQueryProvider";
import Head from "next/head"; // Import next/head

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    template: "%s | SPoTiT",
    default: "SPoTiT",
  },
  description: "The social media app for powernerds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Head>
        {/* Link to manifest */}
        <link
          rel="manifest"
          href="https://progressier.app/DDplMBQ1R0fVVF0buRlF/progressier.json"
        />
        <script
          defer
          src="https://progressier.app/DDplMBQ1R0fVVF0buRlF/script.js"
        ></script>

        {/* OneSignal script */}
        <script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          defer
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.OneSignalDeferred = window.OneSignalDeferred || [];
              OneSignalDeferred.push(async function(OneSignal) {
                await OneSignal.init({
                  appId: "a5eb1e21-e412-4eb3-a001-1c85dcc95ac3",
                  safari_web_id: "web.onesignal.auto.512e7622-1d45-4df4-947f-a5316fda3b8e",
                  notifyButton: {
                    enable: true,
                  },
                });
              });
            `,
          }}
        ></script>
      </Head>

      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </>
  );
}
