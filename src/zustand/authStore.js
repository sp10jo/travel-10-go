import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isLogin: false,
  user: null,
  setLogin: (user) => set({ isLogin: true, user }),
  setLogout: () => set({ isLogin: false, user: null }),
}));

export default useAuthStore;
