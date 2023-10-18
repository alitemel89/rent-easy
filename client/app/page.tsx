"use client";

import FilterRentals from "./components/FilterRentals";
import Rentals from "./components/Rentals";

export default function Home() {
  return (
    <div className="flex gap-4 mx-auto container px-8 mt-8">
      <div className="w-1/5">
        <FilterRentals  />
      </div>
      <div className="w-4/5">
        <Rentals />
      </div>
    </div>
  );
}
