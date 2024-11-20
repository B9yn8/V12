// src/lib/validation.ts
import { z } from "zod";

// إعدادات التحقق لمعادلة كلمة السر الجديدة
export const resetPasswordSchema = z.object({
  userId: z.string().min(1, "User ID is required."),
  username: z.string().min(1, "Username is required."),
  email: z.string().email("Please provide a valid email address."),
  newPassword: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string().min(6, "Password confirmation must be at least 6 characters."),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
