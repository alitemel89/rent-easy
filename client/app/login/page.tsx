"use client";

import { useState } from "react";
import useAuthStore from "../stores/authStore";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import the next/image component
import Link from "next/link";

const LoginPage = () => {
  const { loginUser } = useAuthStore();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(formData);
    router.push("/");
  };

  return (
    <div className="bg-blue-50">
      <div className="md:flex items-center min-h-screen">
        <div className="w-full md:w-1/2">
          <Image
            src="/images/login.svg" // Replace with the path to your image
            alt="Login Image"
            width="100" // Adjust the width as needed
            height="100" // Adjust the height as needed
            className="w-full"
            unoptimized
          />
        </div>
        <form
          className="w-full md:w-1/2 mt-4 bg-white shadow-xl rounded-3xl px-8 pt-6 pb-8 mx-auto max-w-2xl"
          onSubmit={handleSubmit}
        >
          <h1 className="text-left text-3xl text-blue-950 font-extrabold mb-8">
            Sign in
          </h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-indigo-600 hover-bg-blue-700 text-white font-bold 
                  py-3 px-6 rounded-md focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <Link href="/forgot-password" className="text-slate-400 cursor-pointer">Forgot Password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
