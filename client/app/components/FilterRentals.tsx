// FilterRentals.tsx
"use client"
import React, { useState, ChangeEvent } from 'react';

export interface RentalFilter {
    minBedrooms: string;
    maxPrice: string;
  }

export interface FilterRentalsProps {
  onFilterChange: (filter: RentalFilter) => void;
}

const FilterRentals: React.FC<FilterRentalsProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<RentalFilter>({
    minBedrooms: '',
    maxPrice: '',
  });

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  return (
    <div className="bg-gray-200 p-4 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-2">Filter Rentals</h2>
      <form onSubmit={handleFilterSubmit}>
        <div className="mb-4">
          <label className="text-gray-700 text-sm">Minimum Bedrooms:</label>
          <input
            type="number"
            name="minBedrooms"
            value={filters.minBedrooms}
            onChange={handleFilterChange}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700 text-sm">Maximum Price:</label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          onClick={handleFilterSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
        >
          Apply Filters
        </button>
      </form>
    </div>
  );
};

export default FilterRentals;
