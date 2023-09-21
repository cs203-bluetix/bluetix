import { EventSession } from "store/types";
import { mockEvents } from "./events";
import { mockSeats } from "./seats";

export const mockEventSession: EventSession = {
  event: mockEvents[0]!,
  seats: mockSeats,
  sessionid: "abcdef",
  date: "2023-11-15",
};
