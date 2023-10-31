import { create } from "zustand";
import { UserInfo } from "./types";
import { MagicSDK } from "utils/magicSDK";

export interface AuthStoreObject {
  user: UserInfo | null;
  loading: boolean;

  setLoading: (l: boolean) => void;
  loginUser: (user: UserInfo) => void;
  logoutUser: () => void;
  magic: MagicSDK | null;
  setMagic: (m: MagicSDK) => void;
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
  magic: null,
  setMagic: (m: MagicSDK) => set(() => ({ magic: m })),
}));
