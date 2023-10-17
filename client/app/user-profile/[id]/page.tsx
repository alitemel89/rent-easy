"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '../../stores/userStore';
import UpdateUser from '@/app/components/UpdateUser';

const UserProfilePage: React.FC = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const router = useRouter();

  if (!currentUser) {
    router.push('/');
    return null; // Return early when there is no currentUser
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto flex">
        {/* User Profile Section (2/3 width) */}
        <div className="w-2/3 p-4">
          <div className="bg-white shadow-md rounded p-8">
            <>
              <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
              <div className="mb-4">
                <p className="text-gray-700 text-sm font-bold">Avatar:</p>
                <img src={currentUser?.avatar} className="text-gray-900 w-12 h-12 rounded-md" />
              </div>
              <div className="mb-4">
                <p className="text-gray-700 text-sm font-bold">User ID:</p>
                <p className="text-gray-900">{currentUser?._id}</p>
              </div>
              {currentUser?.name && (
                <div className="mb-4">
                  <p className="text-gray-700 text-sm font-bold">Name:</p>
                  <p className="text-gray-900">{currentUser.name}</p>
                </div>
              )}
              {currentUser?.surname && (
                <div className="mb-4">
                  <p className="text-gray-700 text-sm font-bold">Surname:</p>
                  <p className="text-gray-900">{currentUser.surname}</p>
                </div>
              )}
              {currentUser?.phoneNumber && (
                <div className="mb-4">
                  <p className="text-gray-700 text-sm font-bold">Phone Number:</p>
                  <p className="text-gray-900">{currentUser.phoneNumber}</p>
                </div>
              )}
            </>
          </div>
        </div>

        {currentUser && (
          // Update User Section (1/3 width)
          <div className="w-1/3 p-4">
            <UpdateUser currentUser={currentUser} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
