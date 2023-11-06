import React from "react";
import { Event } from "store/types";
import { getReadableDate, getSimpleDate } from "utils/getSimpleDate";

function SessionInfo({ info, date }: { info: Event; date: string }) {
  return (
    <div className="mx-4 mb-6 mt-6 flex w-full flex-col gap-2 md:mx-6">
      <div></div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold text-white">{info.name}</h1>
        <span className="font-semibold text-gray-300">
          {getReadableDate(date).formattedDate} · {info.venue.name}
        </span>
      </div>
    </div>
  );
}

export default SessionInfo;
