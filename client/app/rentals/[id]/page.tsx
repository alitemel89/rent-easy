"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  phoneNumber: string;
  surname: string;
}

interface Rental {
  _id: string;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  location: string;
  userRef: User;
  __v: number;
}

const RentalDetails = () => {
  const { id } = useParams();
  const [rental, setRental] = useState<Rental | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch the rental details based on the ID
      fetch(`https://rent-easy-backend.onrender.com/api/rentals/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setRental(data);
        })
        .catch((error) => {
          console.error("Error fetching rental details:", error);
        });
    }
  }, [id]);

  if (!rental) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-blue-50 min-h-screen">
      <div className="p-8 md:flex gap-4 mx-8">
        <div className="md:w-2/3 w-full p-8 shadow-xl rounded-3xl bg-white">
          <h1 className="text-2xl font-bold">{rental.title}</h1>
          <p className="text-gray-500">{rental.description}</p>
          <p className="text-xl font-bold mt-4">
            Price: ${rental.price} / month
          </p>
          <p>Bedrooms: {rental.bedrooms}</p>
          <p>Bathrooms: {rental.bathrooms}</p>
          <p>Location: {rental.location}</p>
        </div>
        <div className="md:w-1/3 w-full p-8 mt-4 md:m-0 shadow-xl rounded-3xl bg-white">
          <h2 className="text-lg font-semibold">Contact Information</h2>
          <p>Name: {rental.userRef?.name}</p>
          <p>Surname: {rental.userRef?.surname}</p>
          <p>Phone Number: {rental.userRef?.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default RentalDetails;
