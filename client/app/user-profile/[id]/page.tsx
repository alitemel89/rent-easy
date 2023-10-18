"use client";

import React, { useEffect, useState } from "react";
import UpdateUser from "@/app/components/UpdateUser";
import { useParams } from "next/navigation";
import useAuthStore, { User } from "@/app/stores/authStore";

const UserProfilePage: React.FC = () => {
  const { id } = useParams(); // Use the useParams hook to get userId from the URL
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { user } = useAuthStore()

  useEffect(() => {
    const getUser = async () => {
      try {
        // Check if window is defined (client-side) before using localStorage

        const response = await fetch(
          `http://localhost:5000/api/profile/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (response.ok) {
          // If the response is successful, parse the JSON data and set it to currentUser
          const userData = await response.json();
          setCurrentUser(userData);
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("An error occurred while fetching user profile:", error);
      }
    };

    getUser();
  }, [id, user]);


  return (
    <div className="bg-blue-50 min-h-screen">
      <div className="container mx-auto md:flex">
        {/* User Profile Section (2/3 width) */}
        <div className="md:w-3/5 w-full p-4">
          {currentUser && (
            <div className="bg-white shadow-xl rounded-3xl p-8">
              <>
                <h2 className="text-3xl text-blue-950 mb-4 font-extrabold">User Profile</h2>
                <div className="mb-4">
                  <p className="text-gray-700 text-sm font-bold">Avatar:</p>
                  <img
                    src={currentUser?.avatar}
                    className="text-gray-900 w-12 h-12 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <p className="text-gray-700 text-sm font-bold">User ID:</p>
                  <p className="text-gray-900">{id}</p>
                </div>
                {currentUser?.name && (
                  <div className="mb-4">
                    <p className="text-gray-700 text-sm font-bold">Name:</p>
                    <p className="text-gray-900">{currentUser.name}</p>
                  </div>
                )}
                {currentUser?.surname && (
                  <div className="mb-4">
                    <p className="text-gray-700 text-sm font-bold">Surname:</p>
                    <p className="text-gray-900">{currentUser.surname}</p>
                  </div>
                )}
                {currentUser?.phoneNumber && (
                  <div className="mb-4">
                    <p className="text-gray-700 text-sm font-bold">
                      Phone Number:
                    </p>
                    <p className="text-gray-900">{currentUser.phoneNumber}</p>
                  </div>
                )}
              </>
            </div>
          )}
        </div>

        {currentUser && (
          // Update User Section (1/3 width)
          <div className="md:w-2/5 w-full p-4">
            <UpdateUser currentUser={currentUser} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
