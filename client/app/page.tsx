"use client";

import { useState } from "react";
import FilterRentals, { RentalFilter } from "./components/FilterRentals";
import Rentals from "./components/Rentals";

export default function Home() {
  const [filter, setFilter] = useState<RentalFilter>({
    minBedrooms: '',
    maxPrice: '',
  });

  const handleFilterChange = (newFilter: RentalFilter) => {
    setFilter(newFilter);
  };
  return (
    <div className="md:flex gap-4 mx-auto p-8 bg-blue-50 min-h-screen">
      <div className="md:w-1/3 w-full mb-4">
        <FilterRentals onFilterChange={handleFilterChange} />
      </div>
      <div className="md:w-2/3 w-full">
        <Rentals filter={filter }/>
      </div>
    </div>
  );
}
