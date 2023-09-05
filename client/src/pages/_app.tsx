import React from "react";
import { type AppType } from "next/dist/shared/lib/utils";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import "styles/globals.css";
import { DatesProvider } from "@mantine/dates";
const appCache = createEmotionCache({ key: "mantine" });
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MantineProvider emotionCache={appCache} withGlobalStyles withNormalizeCSS>
      <DatesProvider settings={{}}>
        <Component {...pageProps} />
      </DatesProvider>
    </MantineProvider>
  );
};

export default MyApp;
