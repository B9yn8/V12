import { Metadata } from "next";
import Link from "next/link";
import ChangeUsernameForm from "./ChangeUsernameForm";

export const metadata: Metadata = {
  title: "Change Username",
};

export default function Page() {
  return (

        <div className="space-y-5">
          <ChangeUsernameForm />
        <div className="text-center">
          <Link href="/app" className="hover:underline">
            Go Back ?
          </Link>
        </div>
        </div>
 
  );
}
