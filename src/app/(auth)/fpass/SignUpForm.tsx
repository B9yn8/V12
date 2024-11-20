"use client";

import LoadingButton from "@/components/LoadingButton";
import { PasswordInput } from "@/components/PasswordInput";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { resetPassword } from "./actions";  // Ensure the path is correct
import { useRouter } from "next/navigation";  // Import from next/navigation for Next.js 15

// Define form values for reset password
type ResetPasswordValues = {
  userId: string;
  email: string;
  username: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ResetPasswordForm() {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false); // Track success state
  const router = useRouter(); // Initialize useRouter from next/navigation

  const form = useForm<ResetPasswordValues>({
    defaultValues: {
      userId: "",
      email: "",
      username: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: ResetPasswordValues) {
    setError(undefined);
    // Validate that new password matches confirm password
    if (values.newPassword !== values.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    startTransition(async () => {
      const { error } = await resetPassword(values);
      if (error) {
        setError(error);
      } else {
        // Set success state on successful password reset
        setIsSuccess(true);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {error && <p className="text-center text-destructive">{error}</p>}

        {/* Show success message if password is changed */}
        {isSuccess ? (
          <div className="text-center">
            <p className="text-success">The password has been changed successfully. Please login.</p>
            {/* Button to redirect to login page */}
            <LoadingButton
              loading={false}  // Set loading to false as it's not a loading state for this button
              onClick={(e) => {
                e.preventDefault(); // Prevent form submission
                router.push("/login"); // Navigate to the login page
              }}
              className="w-full mt-4"
              type="button" // Ensure the button is not of type "submit"
            >
              Go to Login
            </LoadingButton>
          </div>
        ) : (
          <>
            {/* User ID Field */}
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <Input placeholder="User ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Username Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* New Password Field */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="New Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Confirm Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <LoadingButton loading={isPending} type="submit" className="w-full">
              Reset Password
            </LoadingButton>
          </>
        )}
      </form>
    </Form>
  );
}
