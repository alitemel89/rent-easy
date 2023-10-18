"use client";

import { HomeIcon, UserIcon, Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";
import useAuthStore from "../stores/authStore";
import { useState } from "react";

const Navbar = () => {
  const { logout } = useAuthStore();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    // Add a function to log the user out and clear their data (you may need to implement this in your store)
    logout();
    // Clear the token from localStorage
    window.location.reload();
  };

  return (
    <nav className="p-4 h-20 shadow-sm bg-gradient-to-r from-indigo-300 to-red-300 sticky z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl flex items-center">
          <HomeIcon className="w-8 h-8 mr-2 text-blue-950" />
          <p className="text-blue-950 font-extrabold text-2xl md:text-3xl">
            Rent Easy
          </p>
        </Link>

        <div className="hidden md:flex space-x-6">
          {user ? (
            <>
              <Link
                href={`/user-profile/${user?._id}`}
                className="text-white flex items-center"
              >
                <UserIcon className="w-5 h-5 mr-2" />
                {user?.email} {/* Display the user's email */}
              </Link>
              <Link href="#" onClick={handleLogout} className="text-white">
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-indigo-600 hover-bg-blue-700 text-white font-bold py-3 px-6 
                  rounded-md focus:outline-none focus:shadow-outline"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-blue-950 font-bold py-3 px-6 
                  rounded-md focus:outline-none focus:shadow-outline"
              >
                Register
              </Link>
            </>
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
          absolute top-10 right-6 bg-slate-50 p-4 space-y-2"
          >
            {user ? (
              <>
                <Link
                  href={`/user-profile/${user?._id}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-blue-950 text-center mx-auto hover:text-indigo-600"
                >
                  User Profile
                </Link>
                <Link
                  href="#"
                  className="text-blue-950 mx-auto hover:text-indigo-600"
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-blue-500 rounded-md text-white text-center mx-auto px-8 py-2"
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
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
