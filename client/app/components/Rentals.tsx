"use client";

import React, { useEffect, useState } from "react";
import RentalCard, { Rental } from "./RentalCard";
import { RentalFilter } from "./FilterRentals";

interface RentalsProps {
  filter: RentalFilter;
}

interface RentalsProps {
  filter: RentalFilter;
}


const Rentals = ({ filter }: RentalsProps) => {
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

  const filteredRentals = rentals.filter((rental) => {
    return (
      (filter.minBedrooms === '' || rental.bedrooms >= parseInt(filter.minBedrooms)) &&
      (filter.maxPrice === '' || rental.price <= parseInt(filter.maxPrice))
    );
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {filteredRentals.map((rental) => (
        <RentalCard key={rental._id} rental={rental} />
      ))}
    </div>
  );
};

export default Rentals;
