"use client";

import Link from "next/link";
import ResetPasswordForm from "./ResetPasswordForm";
import { useTheme } from "next-themes";

export default function Page() {
  const { theme } = useTheme(); // get the current theme state

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className={`flex flex-col items-center justify-start w-full min-h-screen overflow-hidden ${theme === "dark" ? "bg-black" : "bg-[#f2f2f3]"}`}>
        <div className="space-y-5">
          <ResetPasswordForm />
          <div className="text-center">
            <Link href="/app" className="hover:underline">
              Go Back ?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
