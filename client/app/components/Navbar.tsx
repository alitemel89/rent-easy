"use client";

import { HomeIcon, UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import useAuthStore from "../stores/authStore";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { logout } = useAuthStore();
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const handleLogout = () => {
    // Add a function to log the user out and clear their data (you may need to implement this in your store)
    logout();
    // Clear the token from localStorage
    window.location.reload();
  };

  return (
    <nav className="p-6 h-20 shadow-sm bg-gradient-to-r from-indigo-300 to-red-300 sticky z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl flex items-center">
          <HomeIcon className="w-8 h-8 mr-2 text-blue-950" />
          <p className="text-blue-950 font-extrabold text-3xl">Rent Easy</p>
        </Link>

        <ul className="flex space-x-6">
          {user ? ( // Check if a user is logged in
            <>
              <li>
                <Link
                  href={`/user-profile/${user?._id}`}
                  className="text-white flex items-center"
                >
                  <UserIcon className="w-5 h-5 mr-2" />
                  {user?.email} {/* Display the user's email */}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  onClick={handleLogout} // Call the logout function when clicking "Logout"
                  className="text-white"
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/login"
                  className="bg-indigo-600 hover-bg-blue-700 text-white font-bold py-3 px-6 
                  rounded-md focus:outline-none focus:shadow-outline"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-blue-950">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
