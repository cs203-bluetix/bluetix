import { create } from "zustand";
import { UserInfo } from "./types";

interface AuthStoreObject {
  user: UserInfo | null;
  loading: boolean;
  setLoading: (l: boolean) => void;
  loginUser: (user: UserInfo) => void;
  logoutUser: () => void;
}

export const useAuthStore = create<AuthStoreObject>((set, get) => ({
  user: null,
  loading: true,
  setLoading: (l) => set(() => ({ loading: l })),
  loginUser: (user) => set(() => ({ user })),
  logoutUser: () => {
    set(() => ({ user: null }));
    get().setLoading(true);
  },
}));
