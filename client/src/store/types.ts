export interface Event {
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
