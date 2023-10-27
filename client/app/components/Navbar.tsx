"use client";

import {
  HomeIcon,
  UserCircleIcon,
  Bars3Icon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import useAuthStore from "../stores/authStore";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { logout } = useAuthStore();
  const { user } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    // Add a function to log the user out and clear their data (you may need to implement this in your store)
    logout();
    // Clear the token from localStorage
    window.location.reload();
  };

  return (
    <div className="p-5 h-20 shadow-sm bg-gradient-to-r from-indigo-300 to-red-300 sticky z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl flex items-center">
          <HomeIcon className="w-8 h-8 mr-2 text-blue-950" />
          <p className="text-blue-950 font-extrabold text-2xl md:text-3xl">
            Rent Easy
          </p>
        </Link>

        <div className="hidden md:flex space-x-4">
          {user ? (
            <div className="flex items-center">
              <Link
                href={`/user-profile/${user?._id}/rentals`}
                className="text-white flex items-center mr-4 bg-indigo-500 px-4 py-1 rounded-md"
              >
                My Rentals
              </Link>
              <div>
                <UserCircleIcon className="w-8 h-8 mr-2 text-white" />
              </div>

              <Link
                href={`/user-profile/${user?._id}`}
                className="text-white flex items-center mr-4"
              >
                {user?.email} {/* Display the user's email */}
              </Link>
              <Link
                href="#"
                onClick={handleLogout}
                className="text-white border
               border-white px-4 py-2 rounded-md flex items-center
               transition-all ease-out duration-200"
              >
                <span className="mx-2 text-white">Log out</span>
                <ArrowRightOnRectangleIcon className="w-4 h-4 text-white" />
              </Link>
            </div>
          ) : (
            <div>
              <Link
                href="/login"
                className="bg-indigo-500 hover-bg-blue-700 text-white font-bold py-1.5 px-6
                  rounded-md focus:outline-none focus:shadow-outline"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-blue-950 font-bold py-1.5 px-6
                  rounded-md focus:outline-none focus:shadow-outline"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <Bars3Icon
            className="w-8 h-8 text-blue-950 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>

        {menuOpen && (
          <div
            className="md:hidden flex flex-col rounded-lg items-end 
          absolute top-12 right-8 bg-slate-50 space-y-2 w-56 py-4"
          >
            {user ? (
              <div className="mx-auto">
                <Link
                  href={`/user-profile/${user?._id}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-blue-950 text-center hover:text-indigo-600"
                >
                  User Profile
                </Link>
                <Link
                  href="#"
                  className="text-blue-950 flex items-center space-x-2 hover:text-indigo-600 mt-4"
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                >
                  <span>Log out</span>
                  <ArrowRightOnRectangleIcon className="w-6 h-6" />
                </Link>
              </div>
            ) : (
              <div className="flex flex-col mx-auto">
                <Link
                  href="/login"
                  className="bg-indigo-500 rounded-md text-white text-center mx-auto px-8 py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-blue-950 text-center mx-auto px-8 py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
