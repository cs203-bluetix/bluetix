import { create } from "zustand";
import { SeatNode, SeatInfo } from "./types";
import { Map } from "leaflet";

interface StoreObject {
  seats: SeatInfo[];
  nodes: SeatNode[];
  addNode: (n: SeatNode) => void;
  setSeats: (s: SeatInfo[]) => void;
  map: Map | null;
  setMap: (m: Map) => void;
}

export const useStore = create<StoreObject>((set) => ({
  seats: [],
  nodes: [],
  addNode: (n) => {
    set((state) => ({ nodes: [...state.nodes, n] }));
  },
  setSeats: (s) => {
    set(() => ({ seats: s }));
  },
  map: null,
  setMap: (m: Map) => {
    set((state) => ({ map: m }));
  },
}));
