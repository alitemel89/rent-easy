import { create } from "zustand";
import { toast } from "react-hot-toast";

export type User = {
  _id: string;
  avatar: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
};

interface FormData {
  email: string;
  password: string;
}

interface UpdatedData {
  name: string;
  surname: string;
  phoneNumber: string;
}

interface AuthState {
  user: User | null;
  init: () => void;
  logout: () => void;
  loginUser: (formData: FormData) => Promise<void>;
  updateUserProfile: (updatedData: UpdatedData, url: string) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  init: () => {
    // Access localStorage only on the client-side
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      set({ user: storedUser });
    }
  },
  logout: () => {
    // Clear the user and the authToken from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    set({ user: null });
  },
  loginUser: async (formData: FormData) => {
    try {
      const response = await fetch("https://rent-easy-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        const { token, user } = data;
        localStorage.setItem("authToken", token);

        set({ user: user });
        toast.success("Login is successful!");
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  },

  updateUserProfile: async (updatedData: UpdatedData, url: string) => {
    try {
      // Send a PUT request to update the user's profile
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        toast.success("Profile updated successfully");
        // Fetch the updated user data and update the state with Zustand
        const updatedUserData = await response.json();
        set({ user: updatedUserData }); // Update the 'user' state with the updated user data
      } else {
        toast.error("Profile update failed");
        // Handle failure, e.g., show an error message
      }
    } catch (error: any) {
      toast.error("Profile update failed", error);
      // Handle the error
    }
  },
}));

useAuthStore.getState().init();

export default useAuthStore;
