"use client";

import { Rental } from "@/app/components/RentalCard";
import UserRentalCard from "@/app/components/UserRentalCard";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserRentals = () => {
  const [userRentals, setUserRentals] = useState<Rental[]>([]);
  const { id } = useParams()
  const router = useRouter()

  useEffect(() => {
    const fetchUserRentals = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/rentals", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserRentals(data);
        } else {
          console.error("Failed to fetch user rentals");
        }
      } catch (error) {
        console.error("Error fetching user rentals", error);
      }
    };

    fetchUserRentals();
  }, []);

  return (
    <div className="bg-blue-50 min-h-screen p-8">
      <div className="flex justify-between">
        <h1 className="text-left text-3xl text-blue-950 font-extrabold">
          My Rentals
        </h1>

        <button
          className="bg-indigo-500 text-sm px-3 py-1 rounded-md text-white flex items-center space-x-2"
          onClick={() => router.push(`/user-profile/${id}/rentals/create`)}
        >
          <span>Create Rental</span>
          <PlusCircleIcon className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {userRentals.map((rental) => (
          <UserRentalCard key={rental._id} rental={rental} />
        ))}
      </div>
    </div>
  );
};

export default UserRentals;
