import { ActionIcon, Button, Divider } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import Drawer from "components/Drawer/Drawer";
import React, { useEffect, useState } from "react";
import { useStore } from "store/seat";
import { SeatNode } from "store/types";
import SeatDrawer from "./SeatDrawer";

function SeatsListing({ nodesToDisplay }: { nodesToDisplay: SeatNode[] }) {
  const { map, setSelectedNode } = useStore();

  return (
    <div className="mt-4 flex max-h-full flex-col">
      <div className="mx-4 flex items-center justify-between md:mx-6">
        <h2 className="text-lg font-semibold tracking-tight text-white">
          {nodesToDisplay.length} listings
        </h2>
      </div>
      <div className="mb-12 mt-4 flex h-full flex-col gap-4 px-2 md:px-4">
        {nodesToDisplay.map((n) => {
          return (
            <div
              key={n.feature.properties?.id}
              className="flex h-fit w-full flex-1 cursor-pointer flex-col rounded-md bg-slate-200 px-2 py-2 shadow-sm"
              onClick={() => {
                const obj = (n.layer as any)._latlngs;
                map?.fitBounds(obj);
                setSelectedNode(n);
              }}
            >
              <div
                className="mb-6 mt-6 flex flex-col gap-1"
                onMouseEnter={() => {
                  (n.layer as any).setStyle({
                    color: "blue",
                    fillColor: "green",
                  });
                  (n.layer as any).bindPopup(
                    `Number of seats: ${n.info.numSeats}`,
                    {
                      className: "popup",
                      closeButton: false,
                    }
                  );
                  (n.layer as any).openPopup();
                }}
                onMouseLeave={() => {
                  console.log(n.info);
                  if (n.info.id === "Stage")
                    (n.layer as any).setStyle({
                      color: "#000000",
                      weight: 0.5,
                      fillColor: "#FFFFFF",
                    });
                  else if (n.info.category === 1)
                    (n.layer as any).setStyle({
                      color: "black",
                      weight: 0.5,
                      fillColor: "yellow",
                    });
                  else if (n.info.category === 2)
                    (n.layer as any).setStyle({
                      color: "black",
                      weight: 0.5,
                      fillColor: "blue",
                    });
                  else if (n.info.category === 3)
                    (n.layer as any).setStyle({
                      color: "black",
                      weight: 0.5,
                      fillColor: "red",
                    });
                  else if (n.info.category === 4)
                    (n.layer as any).setStyle({
                      color: "black",
                      weight: 0.5,
                      fillColor: "green",
                    });
                  else if (n.info.category === 5)
                    (n.layer as any).setStyle({
                      color: "black",
                      weight: 0.5,
                      fillColor: "orange",
                    });
                  else if (n.info.category === 6)
                    (n.layer as any).setStyle({
                      color: "black",
                      weight: 0.5,
                      fillColor: "purple",
                    });
                  else {
                    (n.layer as any).setStyle({
                      color: "black",
                      weight: 0.5,
                      fillColor: "yellow",
                    });
                  }

                  (n.layer as any).closePopup();
                }}
              >
                <span>
                  <span className="text-xl font-bold">${n.info.price}</span>{" "}
                  each
                </span>
                <span>
                  Section {n.info.id} • Category {n.info.category}
                </span>
                <span>Number of seats left: {n.info.numSeats}</span>
              </div>
            </div>
          );
        })}
      </div>
      <SeatDrawer />
    </div>
  );
}

export default SeatsListing;
