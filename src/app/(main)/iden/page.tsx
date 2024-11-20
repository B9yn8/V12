import { cache } from "react";
import { validateRequest } from "@/auth"; // Your authentication middleware
import prisma from "@/lib/prisma"; // Prisma instance to interact with your DB
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Cache function to fetch user data
const getUser = cache(async (username: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      username: true,
      displayName: true,
    },
  });

  if (!user) notFound(); // If user not found, return 404

  return user;
});

interface PageProps {
  params: { username: string };
}

// Generate metadata for the page
export async function generateMetadata({
  params: { username },
}: PageProps): Promise<Metadata> {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) return {};

  const user = await getUser(username);

  return {
    title: `${user.displayName} (@${user.username})`,
  };
}

export default async function Page({ params: { username } }: PageProps) {
  // Get logged-in user data
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) {
    return (
      <p className="text-destructive">
        You&apos;re not authorized to view this page.
      </p>
    );
  }

  // Get the logged-in user's data
  const loggedInUserDetails = await getUser(loggedInUser.username); 

  const handleCopyClick = () => {
    navigator.clipboard.writeText(loggedInUserDetails.id).then(() => {
      alert("User ID copied to clipboard!");
    }).catch((err) => {
      console.error("Error copying text: ", err);
    });
  };

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="h-fit w-full space-y-5 rounded-2xl bg-card p-5 shadow-sm">
          <h1 className="text-2xl font-bold text-center">Your User ID: {loggedInUserDetails.id}</h1>

          {/* Show alert message */}
          <div className="alert alert-warning text-center p-4 mt-4 
                          bg-yellow-100 dark:bg-yellow-700 border-yellow-400 dark:border-yellow-600 rounded-md">
            <strong className="text-lg">Important:</strong>{" "}
            <p>
              Don't share this ID with others. Only use{" "}
              <span className="font-semibold">@7VM7_A</span> if needed.
            </p>
            <p>
              Please save this User ID. It will help you recover your account if you forget your password. This ID is the last solution in such cases.
            </p>
          </div>

          {/* Copy Button */}

          {/* Optionally, if you want to show the logged-in user's display name */}
          <p className="text-center mt-2 text-lg">This is your ID, {loggedInUserDetails.displayName}</p>
        </div>
      </div>
    </main>
  );
}
