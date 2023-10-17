import React, { useState, ChangeEvent } from 'react';

type UpdateUserProps = {
  currentUser: {
    _id: string;
    name: string;
    surname: string;
    phoneNumber: string;
  };
};

const UpdateUser: React.FC<UpdateUserProps> = ({ currentUser }) => {
  const [updatedData, setUpdatedData] = useState({
    name: currentUser?.name || '',
    surname: currentUser?.surname || '',
    phoneNumber: currentUser?.phoneNumber || '',
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

    // Send a PUT request to update the user's profile
    fetch(`http://localhost:5000/api/profile/${currentUser._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("authToken")}`
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Profile updated successfully');
        } else {
          console.error('Profile update failed');
          // Handle failure, e.g., show an error message
        }
      })
      .catch((error) => {
        console.error('Profile update failed', error);
        // Handle the error
      });
  };

  return (
    <div>
      <div className="modal-box p-4 bg-white rounded-md shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
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
