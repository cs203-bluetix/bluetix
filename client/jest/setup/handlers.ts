import { mockEvents } from "mock/events";
import { mockEventSession } from "mock/session";
import { mockVenues } from "mock/venues";
import { rest } from "msw";
import {
  SERVER_API_EVENTS_URL,
  SERVER_API_SESSIONS_URL,
  SERVER_API_VENUES_URL,
} from "utils/globals";

export const handlers = [
  rest.get(SERVER_API_EVENTS_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockEvents));
  }),
  rest.get(SERVER_API_SESSIONS_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockEventSession));
  }),
  rest.get(SERVER_API_VENUES_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockVenues));
  }),
];
