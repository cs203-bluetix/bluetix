import React from "react";
import { type AppType } from "next/dist/shared/lib/utils";
import { MantineProvider } from "@mantine/core";
import "styles/globals.css";
import { DatesProvider } from "@mantine/dates";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <DatesProvider settings={{}}>
        <Component {...pageProps} />
      </DatesProvider>
    </MantineProvider>
  );
};

export default MyApp;
