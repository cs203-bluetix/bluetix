import { Loader } from "@mantine/core";
import React from "react";

function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader />
    </div>
  );
}

export default Loading;
