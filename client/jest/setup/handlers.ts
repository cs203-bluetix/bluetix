import { mockEvents } from "mock/events";
import { mockEventSession } from "mock/session";
import { mockUser } from "mock/user";
import { mockVenues } from "mock/venues";
import { rest } from "msw";
import {
  SERVER_API_EVENTS_URL,
  SERVER_API_LOGIN_URL,
  SERVER_API_SESSIONS_URL,
  SERVER_API_VALIDATE_JWT,
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
  rest.post(SERVER_API_LOGIN_URL, (req, res, ctx) => {
    return res.once(ctx.status(200));
  }),
  rest.post(SERVER_API_LOGIN_URL, (req, res, ctx) => {
    return res(ctx.status(403));
  }),
  rest.post(SERVER_API_VALIDATE_JWT, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockUser));
  }),
];
