import { EventSession } from "store/types";
import { mockEvents } from "./events";
import { mockSeats } from "./seats";

export const mockEventSession: EventSession = {
  event: mockEvents[0]!,
  seats: mockSeats,
  sessionid: "abcdef",
  date: "2023-11-15",
  sessionAddress: "0x0739Ab67Dd1dB81d1b41415c5C1ddDD4578C1907",
};
