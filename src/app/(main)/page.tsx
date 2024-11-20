import Head from "next/head"; // Import Head from next/head
import PostEditor from "@/components/posts/editor/PostEditor";
import TrendsSidebar from "@/components/TrendsSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FollowingFeed from "./FollowingFeed";
import ForYouFeed from "./ForYouFeed";
import UserNewsFeed from "./UserNewsFeed";

export default function Home() {
  return (
    <>
      <Head>
        <link
          rel="manifest"
          href="https://progressier.app/DDplMBQ1R0fVVF0buRlF/progressier.json"
        />
        <script
          defer
          src="https://progressier.app/DDplMBQ1R0fVVF0buRlF/script.js"
        ></script>
      </Head>
      <main className="flex w-full min-w-0 gap-5">
        <div className="w-full min-w-0 space-y-5">
          <PostEditor />
          <Tabs defaultValue="for-you">
            <TabsList>
              <TabsTrigger value="for-you">For you</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
            </TabsList>
            <TabsContent value="for-you">
              <ForYouFeed />
            </TabsContent>
            <TabsContent value="following">
              <FollowingFeed />
            </TabsContent>
            <TabsContent value="news">
              <UserNewsFeed />
            </TabsContent>
          </Tabs>
        </div>
        <TrendsSidebar />
      </main>
    </>
  );
}
