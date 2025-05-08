import moment from "moment";

// Formats to 2023-01-05T11:00:00.000Z
export const formatDateIsoMs = (date) => {
  const formatted = moment(date).format("YYYY-MM-DDTHH:mm:ss.SSS");
  return formatted;
};

// Formats to 05 Jan
export const formatDate2Digit = (isoString) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
  }).format(date);
};

// Formats to 11:00
export const formatTime2Digit = (isoString) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("no-NO", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

// Formats to 15/11/2025, 11:00
export const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};

export const calculateDurationHoursAndMinutes = (departure, arrival) => {
  const [depHour, depMin] = departure.split(":").map(Number);
  const [arrHour, arrMin] = arrival.split(":").map(Number);

  const depDate = new Date(0, 0, 0, depHour, depMin);
  const arrDate = new Date(0, 0, 0, arrHour, arrMin);

  if (arrDate < depDate) arrDate.setDate(arrDate.getDate() + 1);

  const diffMs = arrDate - depDate;
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes}m`;
};
