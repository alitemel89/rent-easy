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
    window.location.reload()
  };


  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl flex items-center">
          <HomeIcon className="w-6 h-6 mr-2" />
          Rent Easy
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
                <Link href="/login" className="text-white">Login</Link>
              </li>
              <li>
                <Link href="/register" className="text-white">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
