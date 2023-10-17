"use client"

import { HomeIcon, UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl flex items-center">
          <HomeIcon className="w-6 h-6 mr-2" />
          Rent Easy
        </Link>

        <ul className="flex space-x-6">
          <li>
            <Link href="/user-profile" className="text-white flex items-center">
              <UserIcon className="w-5 h-5 mr-2" />
              Profile
            </Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
