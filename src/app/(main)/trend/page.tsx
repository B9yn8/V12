// pages/trending.tsx

import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";
import { NextPage } from "next";
import prisma from "@/lib/prisma";
import { formatNumber } from "@/lib/utils";

const TrendingPage: NextPage = () => {
  return (
    <main className="flex flex-col items-center space-y-5 px-4 lg:px-10">
      <h1 className="text-3xl font-bold mb-5 text-gray-900 dark:text-black">Trending Topics</h1>
      <Suspense fallback={<Loader2 className="mx-auto animate-spin text-gray-900 dark:text-black" />}>
        <TrendingTopics />
      </Suspense>
    </main>
  );
};

const getTrendingTopics = async () => {
  const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
    SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
    FROM posts
    GROUP BY (hashtag)
    ORDER BY count DESC, hashtag ASC
    LIMIT 10
  `;

  return result.map((row) => ({
    hashtag: row.hashtag,
    count: Number(row.count),
  }));
};

async function TrendingTopics() {
  const trendingTopics = await getTrendingTopics();

  return (
    <div className="w-full max-w-4xl space-y-4">
      {trendingTopics.length === 0 ? (
        <p className="text-lg text-gray-900 dark:text-black">No trending topics at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingTopics.map(({ hashtag, count }) => {
            const title = hashtag.replace("#", "");
            return (
              <Link key={title} href={`/hashtag/${title}`} className="p-4 bg-gray-100 dark:bg-black rounded-lg hover:bg-gray-200 dark:hover:bg-gray-900">
                <p
                  className="text-lg font-semibold line-clamp-1 break-all hover:underline text-gray-900 dark:text-white"
                  title={hashtag}
                >
                  {hashtag}
                </p>
                <p className="text-sm text-muted-foreground dark:text-gray-400">
                  {formatNumber(count)} {count === 1 ? "post" : "posts"}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TrendingPage;

