const FlightStatusDisplayMap = {
  SCHEDULED: "Scheduled",
  CANCELLED: "Cancelled",
  DELAYED: "Delayed",
};

export function getFlightStatus(flightStatus) {
  return FlightStatusDisplayMap[flightStatus] || "Unknown";
}
