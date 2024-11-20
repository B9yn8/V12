"use server";

import prisma from "@/lib/prisma";

import { hash } from "@node-rs/argon2";

export async function resetPassword({
  userId,
  email,
  username,
  newPassword,
}: {
  userId: string;
  email: string;
  username: string;
  newPassword: string;
}): Promise<{ error?: string }> {
  try {
    // تحقق من أن المستخدم موجود بناءً على المعلومات المدخلة
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        email: email,
        username: username,
      },
    });

    if (!user) {
      return { error: "User not found with provided details" };
    }

    // تجزئة كلمة السر الجديدة
    const passwordHash = await hash(newPassword, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    // تحديث كلمة السر في قاعدة البيانات
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
