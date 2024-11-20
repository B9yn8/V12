"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostDataInclude } from "@/lib/types";
import { createPostSchema } from "@/lib/validation";

export async function submitPost(input: { content: string; mediaIds: string[] }) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const { content, mediaIds } = createPostSchema.parse(input);

  // Create the post in the database
  const newPost = await prisma.post.create({
    data: {
      content,
      userId: user.id,
      attachments: {
        connect: mediaIds.map((id) => ({ id })),
      },
    },
    include: getPostDataInclude(user.id),
  });

  // Push Notification Logic
  try {
    const postTitle = "New Post Notification"; // More descriptive title
    const postBody = content.slice(0, 50) || "No content available"; // Longer preview content

    // Push Notification API URL and request
    const response = await fetch("https://progressier.com/send-push-notification", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.PUSH_NOTIFICATION_API_KEY}`, // Secure API key
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipients: {
          users: "all", // Send to all users who have allowed notifications
        },
        title: postTitle,
        body: postBody,
        url: "https://whatsapp.com/message/rl1KlabM82S3nk",
        badge: "https://whatsapp.com/profile/app-badge.png",
        icon: "https://whatsapp.com/profile/john-doe.png",
        image: "https://whatsapp.com/preview/1KlabM82S3nk.png",
        schedule: new Date().toISOString(), // Adjust if necessary
      }),
    });

    if (!response.ok) {
      throw new Error(`Push notification failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Post Created and Push Notification Sent:", data);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error sending push notification:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }

  // Return the newly created post
  return newPost;
}
