import create from "zustand";

interface AuthStoreObject {
  user: string;
  loginUser: (user: string) => void;
}

export default create<AuthStoreObject>((set) => ({
  user: "",
  loginUser: (user) => set(() => ({ user })),
  logoutUser: () => set(() => ({ user: "" }), true),
}));