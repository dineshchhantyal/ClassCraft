import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { User } from "firebase/auth";
import { useAuthContext } from "@/context/AuthContext";

interface DefaultHeadersProps extends React.HTMLAttributes<HTMLElement> {}
const DefaultHeader = ({}: DefaultHeadersProps) => {
  const { userInfo: user } = useAuthContext();

  return (
    <header className="w-full py-4 md:py-6">
      <div className="container flex items-center justify-between px-4 md:px-6">
        <Link className="flex items-center space-x-2 font-bold" href="/">
          <span className="sr-only">Logo</span>
          <Clock9Icon className="h-6 w-6" />
          <span className="hidden md:inline">ClassCraft</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="#">Components</Link>
          <Link href="#">Resources</Link>
          <Link href="#">Blog</Link>
          <Link href="#">Pricing</Link>
          <Link href="#">Enterprise</Link>
        </nav>
        {user ? (
          <div className="flex items-center gap-4 md:gap-6">
            <Link href="/course-plan">
              <Button size="sm" variant="outline">
                Course Plan
              </Button>
            </Link>
            <Link href="/profile">
              <Button size="sm" variant="outline">
                Profile
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4 md:gap-6">
            <Link
              className="inline-block text-sm font-medium underline"
              href="/signin"
            >
              Sign in
            </Link>
            <Link href="/signup">
              <Button size="sm" variant="outline">
                Sign up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default DefaultHeader;

function Clock9Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 7.5 12" />
    </svg>
  );
}
