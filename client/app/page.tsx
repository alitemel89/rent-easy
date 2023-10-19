"use client";

import FilterRentals from "./components/FilterRentals";
import Rentals from "./components/Rentals";

export default function Home() {
  return (
    <div className="flex gap-4 mx-auto p-8 bg-blue-50 min-h-screen">
      <div className="w-1/5">
        Filter Rentals
      </div>
      <div className="w-4/5">
        <Rentals />
      </div>
    </div>
  );
}
