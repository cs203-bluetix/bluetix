import { create } from "zustand";
import { SeatNode, SeatInfo, EventSession, Cart } from "./types";
import { Map } from "leaflet";

export interface StoreObject {
  nodes: SeatNode[];
  addNode: (n: SeatNode) => void;
  clearNodes: () => void;
  setNodes: (n: SeatNode[]) => void;
  map: Map | null;
  setMap: (m: Map) => void;
  eventSession: EventSession | null;
  setEventSession: (e: EventSession) => void;
  selectedNode: SeatNode | null;
  setSelectedNode: (n: SeatNode | null) => void;
  cart: Cart;
  setCart: (c: Cart) => void;
  reset: () => void;
}

export const useStore = create<StoreObject>((set) => ({
  nodes: [],
  addNode: (n) => {
    set((state) => ({ nodes: [...state.nodes, n] }));
  },
  clearNodes: () => {
    set((state) => ({ nodes: [] }));
  },
  setNodes: (n: SeatNode[]) => {
    set((state) => ({ nodes: n }));
  },
  map: null,
  setMap: (m: Map) => {
    set(() => ({ map: m }));
  },
  eventSession: null,
  setEventSession: (e: EventSession) => {
    set(() => ({ eventSession: e }));
  },
  selectedNode: null,
  setSelectedNode: (n: SeatNode | null) => {
    set(() => ({ selectedNode: n }));
  },
  cart: { cartItems: [], walletAddress: "", totalPrice: 0 },
  setCart: (c: Cart) => {
    set(() => ({ cart: c }));
  },
  reset: () =>
    set(() => ({
      cart: { cartItems: [], walletAddress: "", totalPrice: 0 },
      nodes: [],
      map: null,
      selectedNode: null,
      eventSession: null,
    })),
}));
