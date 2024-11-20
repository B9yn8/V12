"use client";

import LoadingButton from "@/components/LoadingButton";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { changeUsername } from "./actions"; // Ensure this path is correct for the username change action
import { useRouter } from "next/navigation";

type ChangeUsernameValues = {
  userId: string;
  newUsername: string;
};

export default function ChangeUsernameForm() {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const form = useForm<ChangeUsernameValues>({
    defaultValues: {
      userId: "",
      newUsername: "",
    },
  });

  async function onSubmit(values: ChangeUsernameValues) {
    setError(undefined);

    startTransition(async () => {
      const { error } = await changeUsername(values);
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
            <p className="text-success">Username has been changed successfully.</p>
            <LoadingButton
              loading={false}
              onClick={(e) => {
                e.preventDefault();
                router.push("/app");
              }}
              className="w-full mt-4"
              type="button"
            >
              Go Back ?
            </LoadingButton>
          </div>
        ) : (
          <>

        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold">Change Your Username</h1>
          <p className="text-muted-foreground">
            Enter your ID and new username to update it.
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

            {/* New Username Field */}
            <FormField
              control={form.control}
              name="newUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Username</FormLabel>
                  <FormControl>
                    <Input placeholder="New Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <LoadingButton loading={isPending} type="submit" className="w-full">
              Change Username
            </LoadingButton>
          </>
        )}
      </form>
    </Form>
  );
}
