import { Button, Popover, RangeSlider, Select } from "@mantine/core";
import React, { useEffect, useState } from "react";

interface SeatsFilterProps {
  categories: string[];
  priceRange: readonly [number, number];
  onFilterChange: (
    selectedCategory: string,
    selectedNumTickets: number,
    selectedRange: [number, number]
  ) => void;
}

function SeatsFilter({
  categories,
  priceRange,
  onFilterChange,
}: SeatsFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]!);
  const [selectedRange, setSelectedRange] = useState<[number, number]>([
    ...priceRange,
  ]);
  const [selectedNumTickets, setSelectedNumTickets] = useState(`0`);

  useEffect(() => {
    onFilterChange(
      selectedCategory,
      parseInt(selectedNumTickets),
      selectedRange
    );
    console.log(selectedNumTickets);
  }, [selectedCategory, selectedNumTickets, selectedRange]);

  return (
    <div className="mx-6 mb-2 mt-2 w-full">
      <div className="flex w-full flex-col gap-2">
        <h2 className="text-lg">Filter by</h2>
        <div className="flex w-full gap-2">
          <Select
            data={categories}
            value={selectedCategory}
            onChange={(v) => setSelectedCategory(v!)}
          />
          <Select
            data={Array(11)
              .fill(1)
              .map((v, i) => ({
                label: `${i} Ticket`,
                value: i.toString(),
              }))}
            value={selectedNumTickets}
            onChange={(v) => setSelectedNumTickets(v!)}
          />
          <div className="">
            <Popover>
              <Popover.Target>
                <Button variant="filled" color="blue" fullWidth>
                  Price
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <div className="flex w-[300px] flex-col gap-2">
                  <RangeSlider
                    min={priceRange[0]}
                    max={priceRange[1]}
                    size="sm"
                    value={selectedRange}
                    onChange={setSelectedRange}
                  />
                </div>
              </Popover.Dropdown>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeatsFilter;

// category,
// price slider
// number of tickets
