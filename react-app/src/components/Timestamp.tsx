import { useState } from "react";
import dayjs from "dayjs";

interface TimestampProps {
  timestamp: string;
}

// Finnish illative phrase for "not updated in X": "12 minuuttiin", "3 tuntiin", "79 päivään"
const formatStaleDuration = (date: dayjs.Dayjs): string => {
  const minutes = dayjs().diff(date, "minute");
  if (minutes < 60) return `${minutes} minuuttiin`;
  const hours = dayjs().diff(date, "hour");
  if (hours < 24) return `${hours} tuntiin`;
  return `${dayjs().diff(date, "day")} päivään`;
};

export const Timestamp = ({ timestamp }: TimestampProps) => {
  const [showStaleInfo, setShowStaleInfo] = useState(false);

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
    <div>
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
        {isOld && timestampDate && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowStaleInfo((prev) => !prev);
            }}
            className="p-0.5 -m-0.5 rounded-full text-red-600 hover:bg-red-50 transition-colors"
            aria-label="Näytä tieto päivityksen viiveestä"
            aria-expanded={showStaleInfo}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </button>
        )}
      </div>
      {isOld && timestampDate && showStaleInfo && (
        <div className="mt-2 text-xs sm:text-sm text-red-700 bg-red-50 border border-red-100 rounded-md px-2 py-1.5 w-fit">
          Tietoja ei ole päivitetty {formatStaleDuration(timestampDate)}.
        </div>
      )}
    </div>
  );
};
