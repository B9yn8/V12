"use server";

import prisma from "@/lib/prisma";
import { hash } from "@node-rs/argon2";

export async function resetPassword({
  userId,
  newPassword,
}: {
  userId: string;
  newPassword: string;
}): Promise<{ error?: string }> {
  try {
    // تحقق من وجود المستخدم بناءً على الـ ID
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return { error: "User not found with provided ID" };
    }

    // تجزئة كلمة المرور الجديدة
    const passwordHash = await hash(newPassword, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    // تحديث كلمة المرور في قاعدة البيانات
    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });

    return {};
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. Please try again." };
  }
}
