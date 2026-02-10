'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = ({ user }) => {

  const pathname = usePathname();

  return (
    <div className="max-md:hidden flex gap-3 bg-light-2 dark:bg-dark-3 rounded-full">
      <Link href={user ? "/learn" : "/login"}
        className={`py-2 px-6 font-medium ${(pathname === '/learn' || pathname.startsWith('/courses')) && 'bg-dark-1 text-white dark:bg-accent rounded-full'}`}>
        Learn
      </Link>
      <Link href={user ? "/problems" : "/login"}
        className={`py-2 px-6 font-medium ${pathname === '/problems' && 'bg-dark-1 text-white dark:bg-accent rounded-full'}`}>
        Problems
      </Link>
      <Link href={user ? "/profile" : "/login"}
        className={`py-2 px-6 font-medium ${pathname === '/profile' && 'bg-dark-1 text-white dark:bg-accent rounded-full border-b-2 border-accent'}`}>
        Profile
      </Link>
    </div>
  );
};

export default NavLinks;
