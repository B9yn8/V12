"use client";

import LoadingButton from "@/components/LoadingButton";
import { PasswordInput } from "@/components/PasswordInput";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { resetPassword } from "./actions";
import { useRouter } from "next/navigation";

type ResetPasswordValues = {
  userId: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ResetPasswordForm() {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const form = useForm<ResetPasswordValues>({
    defaultValues: {
      userId: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: ResetPasswordValues) {
    setError(undefined);
    if (values.newPassword !== values.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    startTransition(async () => {
      const { error } = await resetPassword(values);
      if (error) {
        setError(error);
      } else {
        setIsSuccess(true);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {error && <p className="text-center text-destructive">{error}</p>}
        {isSuccess ? (
          <div className="text-center">
            <p className="text-success">The password has been changed successfully.</p>
            <LoadingButton
              loading={false}
              onClick={(e) => {
                e.preventDefault();
                router.push("/app");
              }}
              className="w-full mt-4"
              type="button"
            >
              Go Back
            </LoadingButton>
          </div>
        ) : (
          <>

        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold">Reset Your Password</h1>
          <p className="text-muted-foreground">
            Enter your ID and new password to reset it.
          </p>
        </div>
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
