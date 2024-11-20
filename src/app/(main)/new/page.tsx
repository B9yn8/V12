// pages/who-to-follow.tsx

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import FollowButton from "@/components/FollowButton";
import UserAvatar from "@/components/UserAvatar";
import UserTooltip from "@/components/UserTooltip";
import Link from "next/link";
import { NextPage } from "next";

const WhoToFollowPage: NextPage = () => {
  return (
    <main className="flex flex-col items-center space-y-5">
      <h1 className="text-3xl font-bold">Unfollowing Users</h1>
      <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
        <WhoToFollow />
      </Suspense>
    </main>
  );
};

async function WhoToFollow() {
  const { user } = await validateRequest();

  if (!user) return <div>You need to be logged in to see suggestions.</div>;

  const usersToFollow = await prisma.user.findMany({
    where: {
      NOT: {
        id: user.id,
      },
      followers: {
        none: {
          followerId: user.id,
        },
      },
    },
    select: getUserDataSelect(user.id),
    take: 10, // Adjust this number if you want more users displayed
  });

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold"></div>
      {usersToFollow.length === 0 ? (
        <p>No users to follow at the moment.</p>
      ) : (
        usersToFollow.map((user) => (
          <div key={user.id} className="flex items-center justify-between gap-3">
            <UserTooltip user={user}>
              <Link
                href={`/users/${user.username}`}
                className="flex items-center gap-3"
              >
                <UserAvatar avatarUrl={user.avatarUrl} className="flex-none" />
                <div>
                  <p className="line-clamp-1 break-all font-semibold hover:underline">
                    {user.displayName}
                  </p>
                  <p className="line-clamp-1 break-all text-muted-foreground">
                    @{user.username}
                  </p>
                </div>
              </Link>
            </UserTooltip>
            <FollowButton
              userId={user.id}
              initialState={{
                followers: user._count.followers,
                isFollowedByUser: user.followers.some(
                  ({ followerId }) => followerId === user.id
                ),
              }}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default WhoToFollowPage;
