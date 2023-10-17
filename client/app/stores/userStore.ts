import { create } from 'zustand';

type User = {
  _id: string;
  avatar: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
};

type UserStore = {
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  login: (user) => set({ currentUser: user }),
  logout: () => set({ currentUser: null }),
}));

export default useUserStore;
