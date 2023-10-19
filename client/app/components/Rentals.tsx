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
  const [currentPage, setCurrentPage] = useState(1);
  const rentalsPerPage = 9;

  useEffect(() => {
    // Fetch the list of rentals from your API or data source
    const fetchData = async () => {
      try {
        const response = await fetch("https://rent-easy-backend.onrender.com/");
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
      (filter.minBedrooms === "" ||
        rental.bedrooms >= parseInt(filter.minBedrooms)) &&
      (filter.maxPrice === "" || rental.price <= parseInt(filter.maxPrice))
    );
  });

  const paginateRentals = (rentals: Rental[]) => {
    const startIndex = (currentPage - 1) * rentalsPerPage;
    const endIndex = startIndex + rentalsPerPage;
    return rentals.slice(startIndex, endIndex);
  };

  const paginatedRentals = paginateRentals(filteredRentals);

  const totalPages = Math.ceil(filteredRentals.length / rentalsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {paginatedRentals.map((rental) => (
          <RentalCard key={rental._id} rental={rental} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-md bg-indigo-500 text-white mr-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-md bg-indigo-500 text-white ml-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
        </button>

      </div>
      <span className="text-gray-500 flex justify-center my-4">
          Page {currentPage} of {totalPages}
        </span>
    </div>
  );
};

export default Rentals;
