import * as geojson from "geojson";
import { Layer } from "leaflet";
// FETCH
export interface Event {
  id: string;
  name: string;
  eventDetails: string;
  admissionsPolicy: string;
  ticketPricing: string;
  faq: string;
  dates: string[];
  location: string;
  image?: string;
  prices: number[];
}

export type EventList = Event[];

export interface SeatInfo {
  id: string;
  category: number;
  numSeats: number;
  price: number;
}

export interface EventSession {
  sessionid: string;
  seats: SeatInfo[];
  event: Event;
  date: string;
}

export interface SeatNode {
  feature: geojson.Feature;
  layer: Layer;
  info: SeatInfo;
}

export interface Venue {
  venueid: string;
  name: string;
  description: string; // You can define the specific details for a venue here
  address: string;
  url: string;
  image?: string; // Venue image (optional)
}

export type VenueList = Venue[];

export interface UserInfo {
  firstName: string;
  lastName: string;
  isCreator: boolean;
  email: string;
  role: Role;
}

export enum Role {
  GUEST,
  USER,
  ADMIN,
}

export interface CartItem {
  seatId: string;
  category: number;
  totalSeats: number;
  price: number;
}

export interface Cart {
  cartItems: CartItem[];
  walletAddress: string;
  totalPrice: number;
}
