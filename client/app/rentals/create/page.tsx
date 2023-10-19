"use client"

import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function CreateRentalPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    location: '',
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    try {
        const response = await fetch('https://rent-easy-backend.onrender.com/api/rentals/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
        toast.success("Rental is created.")
        } else {
          // Handle error response, e.g., display an error message
        }
      } catch (error: any) {
        toast.error('Error creating rental:', error);
      }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <h1 className="text-2xl font-semibold mb-4">Create Rental</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label>Bedrooms:</label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleInputChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label>Bathrooms:</label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleInputChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <button
            onClick={handleFormSubmit}
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            >
              Create Rental
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
