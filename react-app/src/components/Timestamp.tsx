import dayjs from "dayjs";

interface TimestampProps {
  timestamp: string;
}

export const Timestamp = ({ timestamp }: TimestampProps) => {
  if (!timestamp) {
    return null;
  }

  const comparisonTime = dayjs().subtract(5, "minute");

  const getDateFromString = (dateString: string): dayjs.Dayjs | null => {
    try {
      // Expected format: "DD.MM.YYYY HH:mm"
      const parts = dateString.split(/[.: ]/);
      if (parts.length < 5) {
        return null;
      }
      const [day, month, year, hours, minutes] = parts;
      const date = dayjs(
        new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day),
          parseInt(hours),
          parseInt(minutes)
        )
      );
      return date.isValid() ? date : null;
    } catch (error) {
      console.error("Error parsing timestamp:", error);
      return null;
    }
  };

  const timestampDate = getDateFromString(timestamp);
  const isOld = timestampDate ? timestampDate.isBefore(comparisonTime) : false;

  return (
    <div className="inline-flex items-center gap-2">
      <div
        className={`w-2 h-2 rounded-full ${
          isOld ? "bg-red-500 animate-pulse" : "bg-green-500"
        }`}
      ></div>
      <p
        className={`text-sm font-medium ${
          isOld ? "text-red-600" : "text-green-600"
        }`}
      >
        {timestamp}
      </p>
    </div>
  );
};
