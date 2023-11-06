// RentalCard.tsx
"use client";
import Link from "next/link";
import React from "react";
import { GiBathtub, GiBed } from "react-icons/gi";

import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';

export interface Rental {
  _id: string;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  location: string;
  userRef: string;
  __v: number;
  images: string[];
}

interface RentalCardProps {
  rental: Rental; // Assuming 'Rental' is the type/interface for a single property
}

const RentalCard: React.FC<RentalCardProps> = ({ rental }) => {
  SwiperCore.use([Pagination]); // Enable Swiper modules

  return (
    <Link href={`/rentals/${rental._id}`}>
      <div className="bg-white rounded-3xl p-8 shadow-xl">
        <h2 className="text-2xl font-semibold text-blue-950 mb-2">
          {rental.title}
        </h2>
        <Swiper
          pagination={{ clickable: true }}
          loop={true} // Enable loop
          className="mb-4"
        >
          {rental.images?.map((imageUrl, index) => (
            <SwiperSlide key={index} className="w-full">
              <img
                src={
                  imageUrl ||
                  "https://www.avail.co/wp-content/uploads/2021/08/8-tips-for-renting-out-a-house-for-the-first-time-min.jpg"
                }
                alt={`Image ${index}`}
                className="w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <p className="text-gray-500 text-sm mb-2">{rental.location}</p>
        <p className="text-gray-700 mb-4 max-h-8 truncate">{rental.description}</p>
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
      </div>
    </Link>
  );
};

export default RentalCard;
