"use client";

import React, { useState, ChangeEvent } from "react";
import useAuthStore from "../stores/authStore";
import { useParams } from "next/navigation";

type UpdateUserProps = {
  currentUser: {
    _id: string;
    name: string;
    surname: string;
    phoneNumber: string;
  };
};

const UpdateUser: React.FC<UpdateUserProps> = ({ currentUser }) => {
  const { updateUserProfile } = useAuthStore();
  const { id  } = useParams()
  const [updatedData, setUpdatedData] = useState({
    name: currentUser?.name || "",
    surname: currentUser?.surname || "",
    phoneNumber: currentUser?.phoneNumber || "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleUpdate = () => {
    // Create an object with the updated user data

    const updatedUser = {
      name: updatedData.name,
      surname: updatedData.surname,
      phoneNumber: updatedData.phoneNumber,
    };

    updateUserProfile(
      updatedUser,
      `http://localhost:5000/api/profile/${id}`
    );
  };
  return (
    <div>
      <div className="p-8 bg-white shadow-xl rounded-3xl">
        <h2 className="text-3xl text-blue-950 mb-4 font-extrabold">Update Profile</h2>
        <div className="mb-4">
          <label className="text-gray-700" htmlFor="name">
            Name:
          </label>
          <input
            className="block w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="name"
            value={updatedData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700" htmlFor="surname">
            Surname:
          </label>
          <input
            className="block w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="surname"
            value={updatedData.surname}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700" htmlFor="phoneNumber">
            Phone Number:
          </label>
          <input
            className="block w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="phoneNumber"
            value={updatedData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
