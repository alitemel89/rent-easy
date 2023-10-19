// RentalCard.tsx
"use client"
import Link from 'next/link';
import React from 'react';

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
        <div className="bg-white rounded-3xl p-4 shadow-xl">
          <h2 className="text-lg font-semibold">{rental.title}</h2>
          <p className="text-gray-500 text-sm mb-2">{rental.location}</p>
          <p className="text-gray-700 mb-4">{rental.description}</p>
          <div className="flex justify-between">
            <p className="text-gray-700 text-lg">${rental.price} / month</p>
            <p className="text-gray-700">
              {rental.bedrooms} BR | {rental.bathrooms} BA
            </p>
          </div>
        </div>
    </Link>
  );
};

export default RentalCard;
