import React from "react";
import { PlaneLanding, PlaneTakeoff, ArrowRightLeft } from "lucide-react";
import { getAirports } from "@api/airportApi";
import { AirportIconInput } from "@molecules/AirportIconInput/AirportIconInput";
import "./LocationSwitcher.css";

export default function LocationSwitcher({ from, setFrom, to, setTo }) {
  const [airports, setAirports] = React.useState([]);
  const [_, setLoadingAirports] = React.useState(true);
  const [__, setAirportsError] = React.useState(null);

  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  React.useEffect(() => {
    const fetchAirports = async () => {
      try {
        const res = await getAirports();
        setAirports(res.data);
      } catch (err) {
        setAirportsError(err.message || "Failed to load airports.");
      } finally {
        setLoadingAirports(false);
      }
    };
    fetchAirports();
  }, []);

  const fromOptions = Array.isArray(airports)
    ? airports.filter((airport) => airport.code !== to)
    : [];
  const toOptions = Array.isArray(airports)
    ? airports.filter((airport) => airport.code !== from)
    : [];

  return (
    <div className="switch-button-container">
      <AirportIconInput
        type="text"
        placeholder="From"
        value={from}
        required={true}
        list="from-airports"
        options={fromOptions}
        icon={PlaneTakeoff}
        onChange={(e) => setFrom(e.target.value)}
        className="input-left"
      />

      <button
        onClick={swapLocations}
        className="swap-button"
        aria-label="Swap locations"
      >
        <ArrowRightLeft className="swap-icon" />
      </button>

      <AirportIconInput
        type="text"
        placeholder="To"
        value={to}
        required={true}
        list="to-airports"
        options={toOptions}
        icon={PlaneLanding}
        onChange={(e) => setTo(e.target.value)}
        className="input-right"
      />
    </div>
  );
}
