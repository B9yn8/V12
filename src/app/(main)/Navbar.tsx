import SearchField from "@/components/SearchField";
import UserButton from "@/components/UserButton";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-5 px-5 py-3">
        <Link href="/" className="text-2xl font-bold text-primary">
          SPoTiT
        </Link>
        <SearchField />
        <div
          className="progressier-newsfeed-button"
          style={{
            position: "relative",
            border: 0,
            background: "transparent",
            outline: 0,
            cursor: "pointer",
            width: "20px",
            height: "20px",
          }}
        >
          <svg
            fill="currentColor"
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M6 8a6 6 0 1112 0v2.917c0 .703.228 1.387.65 1.95L20.7 15.6a1.5 1.5 0 01-1.2 2.4h-15a1.5 1.5 0 01-1.2-2.4l2.05-2.733a3.25 3.25 0 00.65-1.95V8zm6 13.5A3.502 3.502 0 018.645 19h6.71A3.502 3.502 0 0112 21.5z"
            />
          </svg>
        </div>
        <UserButton className="sm:ms-auto" />
      </div>
    </header>
  );
}
