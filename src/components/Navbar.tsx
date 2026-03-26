"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="bg-black text-white border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-wide">
          TruMsg
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <span className="text-sm text-gray-300">
                Welcome,{" "}
                <span className="font-semibold text-white">
                  {user?.username}
                </span>
              </span>

              <Button
                onClick={() => signOut()}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button className="bg-blue-700 hover:bg-blue-800 text-white cursor-pointer">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
