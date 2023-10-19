// RentalCard.tsx
"use client";
import Link from "next/link";
import React from "react";
import { GiBathtub, GiBed } from "react-icons/gi";

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
}

interface RentalCardProps {
  rental: Rental; // Assuming 'Rental' is the type/interface for a single property
}

const RentalCard: React.FC<RentalCardProps> = ({ rental }) => {
  return (
    <Link href={`/rentals/${rental._id}`}>
      <div className="bg-white rounded-3xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-blue-950 mb-2">
          {rental.title}
        </h2>
        <p className="text-gray-500 text-sm mb-2">{rental.location}</p>
        <p className="text-gray-700 mb-4">{rental.description}</p>
        <div className="flex justify-between">
          <p className="text-blue-950 text-lg font-extrabold">
            ${rental.price} / month
          </p>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <span>{rental.bathrooms}</span>
              <GiBathtub size={20} className="text-indigo-500"/>
            </div>
            <span>|</span>
            <div className="flex items-center space-x-2">
              <span>{rental.bedrooms}</span>
              <GiBed size={20} className="text-indigo-500"/>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RentalCard;
