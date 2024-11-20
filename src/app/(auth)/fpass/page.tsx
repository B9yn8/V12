import signupImage from "@/assets/signup-image.jpg";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./SignUpForm";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Reset Your Password</h1>
            <p className="text-muted-foreground">
              Forgot your password? Don’t worry, we’ve got you covered. Enter your email to reset it.
            </p>
          </div>
          <div className="space-y-5">
            <SignUpForm />
            <Link href="/login" className="block text-center hover:underline">
              Remembered your password? Log in
            </Link>
          </div>
        </div>
        <Image
          src={signupImage}
          alt=""
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
}