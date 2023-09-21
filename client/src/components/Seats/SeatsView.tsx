import { Button, Divider } from "@mantine/core";
import { useStore } from "store/seat";
import SessionInfo from "./SessionInfo";
import SeatsFilter from "./SeatsFilter";
import SeatsListing from "./SeatsListing";
import { useEffect, useMemo, useState } from "react";
import { SeatNode } from "store/types";
import Cart from "./Cart";

function SeatsView() {
  const { eventSession, nodes, reset } = useStore();

  const [nodesToDisplay, setNodesToDisplay] = useState<SeatNode[]>([]);

  useEffect(() => {
    setNodesToDisplay(nodes);
  }, [nodes]);

  useEffect(() => {
    return () => reset();
  }, []);

  const categories = useMemo(
    () =>
      [
        "Any",
        ...new Set(eventSession?.seats.map((s) => `Cat ${s.category}`)),
      ].sort(),
    [eventSession?.seats]
  );

  const priceRange = useMemo(
    () =>
      [
        Math.min.apply(
          null,
          eventSession!.seats.map((s) => s.price)
        ),
        Math.max.apply(
          null,
          eventSession!.seats.map((s) => s.price)
        ),
      ] as const,
    [eventSession?.seats]
  );

  const onFilterChange = (
    selectedCategory: string,
    selectedNumTickets: number,
    selectedRange: [number, number]
  ) => {
    const newNodes = nodes.filter(
      (n) =>
        (selectedCategory === "Any" ||
          `Cat ${n.info.category}` === selectedCategory) &&
        (selectedNumTickets === 11 || selectedNumTickets <= n.info.numSeats) &&
        n.info.price >= selectedRange[0] &&
        n.info.price <= selectedRange[1]
    );
    console.log(newNodes);
    setNodesToDisplay(newNodes);
  };

  return (
    <div className="relative h-full" id="drawer-container">
      <div className="flex max-h-full flex-col gap-2 overflow-y-auto">
        <SessionInfo info={eventSession?.event!} date={eventSession?.date!} />
        <Divider />
        <SeatsFilter
          categories={categories}
          priceRange={priceRange}
          onFilterChange={onFilterChange}
        />
        <SeatsListing nodesToDisplay={nodesToDisplay} />
        <Cart />
      </div>
    </div>
  );
}

export default SeatsView;
