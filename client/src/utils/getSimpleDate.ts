import dayjs from "dayjs";

export const getSimpleDate = (date: string | number | Date) => {
  const formattedDate = new Date(date);
  const formattedTime = `${formattedDate
    .getHours()
    .toString()
    .padStart(2, "0")}:${formattedDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  return [formattedDate.toLocaleDateString(), formattedTime];
};

export const getReadableDate = (date: string | number) => {
  const formattedDateTime = dayjs(date)
    .locale("en")
    .format("D MMM YYYY - HH:mm");
  const formattedDate = dayjs(date).locale("en").format("D MMM YYYY");
  return { formattedDate, formattedDateTime };
};

export const isSameDate = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
