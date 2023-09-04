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
}

export type EventList = Event[];
