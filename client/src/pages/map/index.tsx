"use client";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

import React from "react";
const LeafletMap = dynamic(() => import("../../components/Map/LeafletMap"), {
  ssr: false,
});

function Leaf() {
  return (
    <div className="flex h-screen w-full">
      <div className="w-full"></div>
      <div className="h-full w-full">
        <LeafletMap />
      </div>
    </div>
  );
}

export default Leaf;
