import { Metadata } from "next";
import Head from "next/head"; // Import Head from next/head
import Image from "next/image";
import Link from "next/link";
import GoogleSignInButton from "./google/GoogleSignInButton";
import LoginForm from "./LoginForm";
import loginImage from "@/assets/login-image.jpg"; // Image import

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <>
      <Head>
        <link
          rel="manifest"
          href="https://progressier.app/DDplMBQ1R0fVVF0buRlF/progressier.json"
        />
        <script
          defer
          src="https://progressier.app/DDplMBQ1R0fVVF0buRlF/script.js"
        ></script>
      </Head>
      <main className="flex h-screen items-center justify-center p-5">
        <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
          <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
            <h1 className="text-center text-3xl font-bold">Login to SPoTiT</h1>
            <div className="space-y-5">
              <GoogleSignInButton />
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-muted" />
                <span>OR</span>
                <div className="h-px flex-1 bg-muted" />
              </div>
              <LoginForm />
              <Link href="/signup" className="block text-center hover:underline">
                Don&apos;t have an account? Sign up
              </Link>
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-muted" />
                <span>Forgot your password?</span>
                <div className="h-px flex-1 bg-muted" />
              </div>
              <Link href="/fpass" className="block text-center hover:underline">
                Reset Your Password
              </Link>
            </div>
          </div>
          <Image
            src={loginImage}
            alt="Login image"
            className="hidden w-1/2 object-cover md:block"
          />
        </div>
      </main>
    </>
  );
}