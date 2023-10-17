import { create } from 'zustand';

type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
};

const useUserStore = create((set) => ({
  currentUser: null as User | null,
  login: (user: User) => set({ currentUser: user }),
  logout: () => set({ currentUser: null }),
}));

export default useUserStore;
