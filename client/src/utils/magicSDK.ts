import { Magic } from "magic-sdk";
import { Button } from "@mantine/core";
import { env } from "env.mjs";

const createMagic = () => {
  return typeof window != "undefined"
    ? new Magic(env.NEXT_PUBLIC_MAGIC_API_KEY)
    : null;
};

export const magic = createMagic();

export type MagicSDK = typeof magic;
