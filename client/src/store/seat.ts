import { create } from "zustand";
import { SeatNode } from "./types";

interface StoreObject {
  nodes: SeatNode[];
  addNode: (n: SeatNode) => void;
}

export const useStore = create<StoreObject>((set) => ({
  nodes: [],
  addNode: (n: SeatNode) => {
    set((state) => ({ nodes: [...state.nodes, n] }));
  },
}));
