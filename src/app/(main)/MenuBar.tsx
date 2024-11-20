import { validateRequest } from "@/auth";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import streamServerClient from "@/lib/stream";
import { Bookmark, Home, UserPlus } from "lucide-react"; // إضافة الأيقونات من Lucide
import { LogOut } from "lucide-react"; // استيراد LogOut
import Link from "next/link";
import MessagesButton from "./MessagesButton";
import NotificationsButton from "./NotificationsButton";
import { Settings } from 'lucide-react';
import { Hash } from 'lucide-react';


interface MenuBarProps {
  className?: string;
}

export default async function MenuBar({ className }: MenuBarProps) {
  const { user } = await validateRequest();

  if (!user) return null;

  const [unreadNotificationsCount, unreadMessagesCount] = await Promise.all([
    prisma.notification.count({
      where: {
        recipientId: user.id,
        read: false,
      },
    }),
    (await streamServerClient.getUnreadCount(user.id)).total_unread_count,
  ]);

  // Logout function
  const logoutUser = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className={`${className} MenuBar`}>
      <Button
        variant="ghost"
        className="MenuBarButton flex items-center justify-start gap-3"
        title="Home"
        asChild
      >
        <Link href="/">
          <Home className="text-sm" /> {/* أصغر حجم الأيقونة */}
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>


      <Button
        variant="ghost"
        className="MenuBarButton flex items-center justify-start gap-3"
        title="Home"
        asChild
      >
        <Link href="/trend">
          <Hash className="text-sm" /> {/* أصغر حجم الأيقونة */}
          <span className="hidden lg:inline">Trending</span>
        </Link>
      </Button>


      <NotificationsButton
        initialState={{ unreadCount: unreadNotificationsCount }}
      />
      <MessagesButton initialState={{ unreadCount: unreadMessagesCount }} />


      <Button
        variant="ghost"
        className="MenuBarButton flex items-center justify-start gap-3"
        title="Logout"
        asChild
      >
        <Link href="/app">
          <Settings className="text-sm" /> {/* أصغر حجم الأيقونة */}
          <span className="hidden lg:inline">Settings</span>
        </Link>
      </Button>
    </div>
  );
}
