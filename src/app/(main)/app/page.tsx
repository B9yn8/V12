"use client";

import { logout } from "@/app/(auth)/actions";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LogOut, Instagram, Settings, Sun, Moon, BookmarkPlus, UserPlus, ShieldCheck, ShieldEllipsis } from "lucide-react";
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
    router.push("/login"); // Redirect to the login page
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
        <title>Setting Page</title>
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
     

          {/* UserID Button */}
          <button
            onClick={() => (window.location.href = "/secur")}
            className="w-3/4 mx-auto bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold py-2 px-4 mt-4 rounded-md shadow-2xl transition duration-200 ease-in-out transform hover:scale-105 flex items-center gap-2"
          >
            <ShieldEllipsis className="w-5 h-5 text-white" />
            <span>Security</span>
          </button>

          {/* Bookmarks Button */}
          <button
            onClick={() => (window.location.href = "/bookmarks")}
            className="w-3/4 mx-auto bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold py-2 px-4 mt-4 rounded-md shadow-2xl transition duration-200 ease-in-out transform hover:scale-105 flex items-center gap-2"
          >
            <BookmarkPlus className="w-5 h-5 text-white" />
            <span>Bookmarks</span>
          </button>

          {/* New Users Button */}
          <button
            onClick={() => (window.location.href = "/new")}
            className="w-3/4 mx-auto bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold py-2 px-4 mt-4 rounded-md shadow-2xl transition duration-200 ease-in-out transform hover:scale-105 flex items-center gap-2"
          >
            <UserPlus className="w-5 h-5 text-white" />
            <span>New Users</span>
          </button>

          {/* Dark/Light Mode Toggle */}
          <button
            onClick={handleThemeChange}
            className="w-3/4 mx-auto bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold py-2 px-4 mt-4 rounded-md shadow-lg transform hover:scale-105 flex items-center gap-2"
          >
            {theme === "dark" ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-white" />}
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </button>

          {/* Instagram Support Button */}
          <button
            onClick={() => window.open("https://instagram.com/akid.lotfi.spotit")}
            className="w-3/4 mx-auto bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold py-2 px-4 mt-4 rounded-md shadow-2xl transition duration-200 ease-in-out transform hover:scale-105 flex items-center gap-2"
          >
            <Instagram className="w-5 h-5 text-white" />
            <span>Support</span>
          </button>

          {/* Logout Button */}
          <div className="text-center mb-6">
            <p className={`text-lg mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-700"}`}>
              Thank you for using our service. You can log out securely below.
            </p>
          </div>
          <button
            onClick={handleLogout} // Trigger logout and redirection
            className="w-3/4 mx-auto bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold py-2 px-4 mt-4 rounded-md shadow-lg transition duration-200 ease-in-out transform hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-orange-400 flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
