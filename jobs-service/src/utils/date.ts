import { addHours, addMinutes, format } from "date-fns";

type DescribableFunction = {
  (date: number | Date, amount: number): Date;
};

const getCleanTime = (
  time: string
): [number, [string, DescribableFunction]] | null => {
  let timeDetails: [string | null, DescribableFunction] | null = null;

  if (time.endsWith("h")) timeDetails = ["h", addHours];
  else if (time.endsWith("min")) timeDetails = ["min", addMinutes];

  if (!timeDetails) return null;

  const amount = time.split(timeDetails[0])[0];
  return [parseInt(amount), timeDetails];
};

export const getFutureTimestamp = (
  currTimestamp: number | Date,
  timeToAdd: number,
  fn: DescribableFunction
): string => {
  return getFormattedTimestamp(fn(currTimestamp, timeToAdd));
};

export const getFormattedTimestamp = (timestamp: number | Date): string => {
  return format(timestamp, "yyyy-MM-dd HH:mm:ss");
};

export const getTimestamp = (time: string): string => {
  const [amount, timeDetails] = getCleanTime(time);

  const futureTimestamp = getFutureTimestamp(
    new Date(),
    amount,
    timeDetails[1]
  );
  console.log("futureTimestamp", futureTimestamp);
  return futureTimestamp;
};
