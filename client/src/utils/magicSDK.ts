import { Magic } from "magic-sdk";
import { Button } from "@mantine/core";
import { env } from "env.mjs";

const createMagic = (): Magic | null => {
  const customNodeOptions = {
    rpcUrl: env.NEXT_PUBLIC_MUMBAI_RPC_URL,
    chainId: 80001,
  };
  return typeof window != "undefined"
    ? new Magic(env.NEXT_PUBLIC_MAGIC_API_KEY, {
        // network: customNodeOptions,
      })
    : null;
};

export const magic = createMagic();

export type MagicSDK = typeof magic;
