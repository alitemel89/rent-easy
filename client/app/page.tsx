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
    <div className="flex gap-4 mx-auto p-8 bg-blue-50 min-h-screen">
      <div className="w-1/5">
        <FilterRentals onFilterChange={handleFilterChange} />
      </div>
      <div className="w-4/5">
        <Rentals filter={filter }/>
      </div>
    </div>
  );
}
