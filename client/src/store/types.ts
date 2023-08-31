import * as geojson from "geojson";
import { Layer } from "leaflet";
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

export interface SeatNode {
  feature: geojson.Feature;
  layer: Layer;
}
