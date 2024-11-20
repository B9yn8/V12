"use client";

import { logout } from "@/app/(auth)/actions";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LogOut, Settings, ShieldCheck, ArrowBigLeft, RectangleEllipsis, User } from "lucide-react";
import { useSession } from "@/app/(main)/SessionProvider";
import { useTheme } from "next-themes"; // Import from next-themes
import Link from "next/link";


export default function LogoutPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useSession();
  const { theme, setTheme } = useTheme(); // Get current theme and setTheme function

  // Handle logout logic and redirect
  const handleLogout = async () => {
    queryClient.clear(); // Clear cached data from the query client
    await logout(); // Perform the logout action
    router.push("/app"); // Redirect to the login page
  };

  const handleThemeChange = () => {
    // Toggle between Light and Dark modes only
    if (theme === "light") {
      setTheme("dark"); // Set to dark if currently light
    } else {
      setTheme("light"); // Set to light if currently dark
    }
  };

  return (
    <>
      <head>
        <meta name="description" content="Logout page for securely logging out of your account. Stay connected for further support." />
        <title>Security Setting</title>
      </head>

      <div className={`flex flex-col items-center justify-start w-full min-h-screen overflow-hidden py-8 ${theme === "dark" ? "bg-black" : "bg-[#f2f2f3]"}`}>
        {/* Image at the top */}
        <div className="w-full flex justify-center mb-4">
          <img src="https://c.top4top.io/p_3236dycyc1.png" alt="Logo" className="w-24 h-24 rounded-full" />
        </div>

        {/* Title and description */}
        <div className="text-center mb-6">
          <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Setting</h1>
        </div>

        {/* Profile and Settings Buttons */}
        <div className="flex flex-col gap-6 w-full max-w-sm">
          {/* Profile Button */}
          <Link href={`/users/${user.username}`}>
            <button className="w-3/4 mx-auto bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold py-2 px-4 rounded-md shadow-lg transform hover:scale-105 flex items-center gap-2">
              <Settings className="w-5 h-5 text-white" />
              <span>Profile Settings</span>
            </button>
          </Link>

          {/* UserID Button */}
          <button
            onClick={() => (window.location.href = "/iden")}
            className="w-3/4 mx-auto bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold py-2 px-4 mt-4 rounded-md shadow-2xl transition duration-200 ease-in-out transform hover:scale-105 flex items-center gap-2"
          >
            <ShieldCheck className="w-5 h-5 text-white" />
            <span>Your ID</span>
          </button>

          {/* Username Button */}
          <button
            onClick={() => (window.location.href = "/username")}
            className="w-3/4 mx-auto bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold py-2 px-4 mt-4 rounded-md shadow-2xl transition duration-200 ease-in-out transform hover:scale-105 flex items-center gap-2"
          >
            <User className="w-5 h-5 text-white" />
            <span>Change Username</span>
          </button>

          {/* Password Button */}
          <button
            onClick={() => (window.location.href = "/cpass")}
            className="w-3/4 mx-auto bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold py-2 px-4 mt-4 rounded-md shadow-2xl transition duration-200 ease-in-out transform hover:scale-105 flex items-center gap-2"
          >
            <RectangleEllipsis className="w-5 h-5 text-white" />
            <span>Change Password</span>
          </button>

          {/* Back Button */}
          <button
            onClick={() => (window.location.href = "/app")}
            className="w-3/4 mx-auto bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold py-2 px-4 mt-4 rounded-md shadow-2xl transition duration-200 ease-in-out transform hover:scale-105 flex items-center gap-2"
          >
          <ArrowBigLeft className="w-5 h-5 text-white" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </>
  );
}
