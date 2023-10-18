"use client";

import React, { useEffect, useState } from "react";
import RentalCard, { Rental } from "./RentalCard";

const Rentals: React.FC = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);

  useEffect(() => {
    // Fetch the list of rentals from your API or data source
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/rentals/all");
        if (response.ok) {
          const data = await response.json();
          setRentals(data); // Assuming 'data' is an array of rental objects
        }
      } catch (error) {
        console.error("Error fetching rentals", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {rentals.map((rental) => (
        <RentalCard key={rental._id} rental={rental} />
      ))}
    </div>
  );
};

export default Rentals;
