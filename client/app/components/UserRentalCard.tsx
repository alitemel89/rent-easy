// RentalCard.tsx
"use client";
import { ArrowPathIcon, TrashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { GiBathtub, GiBed } from "react-icons/gi";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Rental } from "./RentalCard";

interface RentalCardProps {
  rental: Rental; // Assuming 'Rental' is the type/interface for a single property
}

const UserRentalCard: React.FC<RentalCardProps> = ({ rental }) => {
  SwiperCore.use([Pagination]); // Enable Swiper modules

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/rentals/delete/${rental._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.ok) {
        // Handle successful delete, e.g., remove the rental from the UI
        toast.success("Rental deleted successfully");
      } else {
        // Handle error response, e.g., display an error message
        toast.error("Error deleting rental");
      }
    } catch (error: any) {
      toast.error("Error deleting rental:", error);
    }
  };
  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl">
      <Link href={`/rentals/${rental._id}`}>
        <h2 className="text-xl font-semibold text-blue-950 mb-2 hover:text-pink-500">
          {rental.title}
        </h2>
      </Link>
      <p className="text-gray-500 text-sm mb-2">{rental.location}</p>
      <p className="text-gray-700 mb-4">{rental.description}</p>

      <Swiper pagination={{ clickable: true }} loop={true} className="mb-4">
        {rental.images?.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <img src={imageUrl} alt={`Image ${index}`} className="w-full" />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-between">
        <p className="text-blue-950 text-lg font-extrabold">
          ${rental.price} / month
        </p>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <span>{rental.bathrooms}</span>
            <GiBathtub size={20} className="text-indigo-500" />
          </div>
          <span>|</span>
          <div className="flex items-center space-x-2">
            <span>{rental.bedrooms}</span>
            <GiBed size={20} className="text-indigo-500" />
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <button className="flex items-center space-x-2 bg-indigo-500 text-sm mt-4 px-3 py-1 rounded-md">
          <span className="text-white">Update</span>
          <ArrowPathIcon className="text-white w-4 h-4" />
        </button>
        <button
          className="flex items-center space-x-2 bg-red-500 text-sm mt-4 px-3 py-1 rounded-md"
          onClick={handleDelete}
        >
          <span className="text-white">Delete</span>
          <TrashIcon className="text-white w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default UserRentalCard;
