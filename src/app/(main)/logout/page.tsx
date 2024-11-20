"use client";

import { logout } from "@/app/(auth)/actions";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react"; // Assuming you're using lucide-react
import { Instagram } from "lucide-react"; // Instagram icon from lucide-react

export default function LogoutPage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Handle logout logic and redirect
  const handleLogout = async () => {
    queryClient.clear(); // Clear cached data from the query client
    await logout(); // Perform the logout action
    router.push("/login"); // Redirect to the login page
  };

  return (
    <>
      <head>
        <meta name="description" content="Logout page for securely logging out of your account. Stay connected for further support." />
        <title>Logout Page</title>
      </head>

      <div className="flex flex-col items-center justify-start w-full min-h-screen overflow-hidden bg-gray-100 dark:bg-black py-8">
        {/* Image at the top */}
        <div className="w-full flex justify-center mb-4">
          <img src="https://c.top4top.io/p_3236dycyc1.png" alt="Logo" className="w-24 h-24" />
        </div>

        {/* Title and description */}
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Logout</h1>
          <p className="text-lg mt-2 text-gray-700 dark:text-gray-400">
            Securely log out of your account and stay connected for further support.
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout} // Trigger logout and redirection
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition duration-200 ease-in-out transform hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center gap-2"
        >
          <LogOut className="w-5 h-5" /> {/* Logout icon */}
          Logout
        </button>

        {/* Support Button */}
        <button
          onClick={() => window.open("https://www.instagram.com/yourusername", "_blank")} // Open Instagram in a new tab
          className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-2 px-4 mt-4 rounded-md shadow-2xl transition duration-200 ease-in-out transform hover:scale-105 dark:from-orange-600 dark:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center gap-2"
        >
          <Instagram className="w-5 h-5 text-white" /> {/* Instagram icon */}
          <span className="mr-2">Support</span> {/* Text for the Support button */}
        </button>
      </div>
    </>
  );
}
