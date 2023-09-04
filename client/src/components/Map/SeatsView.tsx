import { Button } from "@mantine/core";
import React from "react";
import { useStore } from "store/seat";

function SeatsView() {
  const store = useStore();
  return (
    <div className="h-full">
      <div className="flex max-h-full flex-col gap-4 overflow-y-auto">
        {store.nodes.map((n) => {
          return (
            <div className="ml-8 mt-8 flex min-h-[100px] w-[500px] flex-1 gap-8">
              <div>{n.feature.properties?.id}</div>
              <Button
                onClick={() => {
                  const obj = (n.layer as any)._latlngs;
                  console.log(obj);
                  store.map?.fitBounds(obj);
                }}
              >
                View
              </Button>
              <div className="flex flex-col">
                <span>Category: {n.info.category}</span>
                <span>Number of seats left: {n.info.numSeats}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SeatsView;
