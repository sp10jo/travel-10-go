import { create } from "zustand";

const useAuthStore = create({
  isLogin: false,
  user: null,
})

export default useAuthStore;