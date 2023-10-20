import { server } from "../jest/setup/server";

process.env.NEXT_PUBLIC_SERVER_URL = "http://localhost:8080";
process.env.NEXT_PUBLIC_MAGIC_API_KEY = "s";
process.env.NEXT_PUBLIC_MUMBAI_RPC_URL = "z";
process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL = "x";

beforeAll(() => {
  server.listen();
  jest.useFakeTimers();
});

afterEach(() => server.resetHandlers());

afterAll(() => {
  server.close();
  jest.useRealTimers();
});
