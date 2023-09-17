import React from "react";
import { Event } from "store/types";
import { getReadableDate, getSimpleDate } from "utils/getSimpleDate";

function SessionInfo({ info, date }: { info: Event; date: string }) {
  return (
    <div className="mx-4 mb-6 mt-6 flex w-full flex-col gap-2 md:mx-6">
      <div></div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold">{info.name}</h1>
        <span className="font-semibold text-gray-500">
          {getReadableDate(date).formattedDate} · {info.location}
        </span>
      </div>
    </div>
  );
}

export default SessionInfo;
