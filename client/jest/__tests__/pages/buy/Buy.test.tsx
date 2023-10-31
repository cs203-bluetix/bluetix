import { render, screen, waitFor, act } from "@testing-library/react";
import { mockEventSession } from "../../../../src/mock/session";
import "@testing-library/jest-dom";
import { create } from "zustand";
import { AuthStoreObject, useAuthStore } from "../../../../src/store/auth";
import { MagicSDK } from "../../../../src/utils/magicSDK";
import {
  Cart,
  EventSession,
  Role,
  SeatNode,
} from "../../../../src/store/types";
import { testUser } from "../../../mocks/user";
import { StoreObject } from "../../../../src/store/seat";
import { Map } from "leaflet";

jest.mock("../../../../src/store/auth.ts", () => ({
  useAuthStore: jest.fn().mockImplementation(
    create<AuthStoreObject>((set, get) => ({
      user: testUser,
      loading: true,
      setLoading: (l) => set(() => ({ loading: l })),
      loginUser: (user) => set(() => ({ user })),
      logoutUser: () => {
        set(() => ({ user: null }));
        get().setLoading(true);
      },
      magic: null,
      setMagic: (m: MagicSDK) => set(() => ({ magic: m })),
    }))
  ),
}));

jest.mock("../../../../src/store/seat.ts", () => ({
  useStore: jest.fn().mockImplementation(
    create<StoreObject>((set) => ({
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
      eventSession: mockEventSession,
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
    }))
  ),
}));

import BuyPage from "../../../../src/pages/buy/[[...slug]]";

describe("Buy Page", () => {
  it("should render buy page correctly", async () => {
    const useRouter = jest.spyOn(require("next/router"), "useRouter");

    // useAuthStore.mockImplementation(() => {
    //   const store = create<AuthStoreObject>((set, get) => ({
    //     user: null,
    //     loading: true,
    //     setLoading: (l) => set(() => ({ loading: l })),
    //     loginUser: (user) => set(() => ({ user })),
    //     logoutUser: () => {
    //       set(() => ({ user: null }));
    //       get().setLoading(true);
    //     },
    //     magic: null,
    //     setMagic: (m: MagicSDK) => set(() => ({ magic: m })),
    //   }));
    //   return store;
    // });

    useRouter.mockImplementation(() => ({
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    }));

    await act(async () => {
      render(<BuyPage eventSession={mockEventSession} />);
    });

    screen.debug(undefined, Infinity);
  });
});
