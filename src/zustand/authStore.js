import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isLogin: false,
  user: null,
  token: null,
  setLogin: (user, token) => set({ isLogin: true, user, token }),
  setLogout: () => set({ isLogin: false, user: null, token: null }),
  setToken: (token) => set({ token }),
}));

export default useAuthStore;
