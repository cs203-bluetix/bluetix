import * as geojson from "geojson";
import { Layer } from "leaflet";
import { ReactNode } from "react";
// FETCH
export interface Event {
  [x: string]: ReactNode;
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

export interface CalendarDate {
  sessionid: string;
  title: string;
  start: Date;
  end: Date;
}

export type CalendarDateList = CalendarDate[];

export interface Sections {
  venue_id: string;
  section_id: string;
  category: string;
  max_seat: string;
}

export interface Ticket {
  venue_id: string;
  section_id: string;
  event_id: string;
  session_id: string;
  numSeatsLeft: string;
  price: string;
}

export interface Session {
  sessionid: string;
  date: string;
  start_time: string;
  end_time: string;
}

export type SessionList = Session[];

export interface TimeRange {
  date: Date;
  start_time: string;
  end_time: string;
}

export type TimeRangeList = TimeRange[];

export interface categoryPricing {
  category: string;
  price: number;
  event_id: string;
  venue_id: string;
}

export type categoryPricingList = categoryPricing[];

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
