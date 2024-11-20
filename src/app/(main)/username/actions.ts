"use server";

import prisma from "@/lib/prisma";

export async function changeUsername({
  userId,
  newUsername,
}: {
  userId: string;
  newUsername: string;
}): Promise<{ error?: string }> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return { error: "User not found with provided ID" };
    }

    await prisma.user.update({
      where: { id: userId },
      data: { username: newUsername },
    });

    return {};
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again." };
  }
}
