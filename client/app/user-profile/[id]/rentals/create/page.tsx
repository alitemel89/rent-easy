"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { CldUploadButton } from "next-cloudinary";
import { CldImage } from "next-cloudinary";
import { PhotoIcon } from "@heroicons/react/24/solid";

interface CreateRentalForm {
  title: string;
  description: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  location: string;
  images: string[];
}

export default function CreateRentalPage() {
  const [formData, setFormData] = useState<CreateRentalForm>({
    title: "",
    description: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    location: "",
    images: [], // Store selected image URLs
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/rentals/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Rental is created.");
      } else {
        // Handle error response, e.g., display an error message
      }
    } catch (error: any) {
      toast.error("Error creating rental:", error);
    }
  };


  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-3xl shadow-xl w-full md:w-1/2 mt-8">
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

          {/* Cloudinary Image Upload  */}
          <CldUploadButton
            onUpload={(result: any) => {
              const secure_url = result.info.secure_url;
              setFormData((prevFormData) => ({
                ...prevFormData,
                images: [...prevFormData.images, secure_url],
              }));
            }}
            uploadPreset="yq2u7vir"
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 
            rounded-md focus:outline-none focus:shadow-outline w-full mb-4"   
          />

          {formData.images &&
            formData.images.map((image) => (
              <CldImage
                width="300"
                height="300"
                src={image}
                sizes="100vw"
                alt="Description of my image"
                className="flex gap-2"
              />
            ))}

          <div className="mb-4">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            >
              Create Rental
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
