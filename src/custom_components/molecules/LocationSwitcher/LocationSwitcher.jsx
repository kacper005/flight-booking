import React from "react";
import "./LocationSwitcher.css";
import { AirportIconInput } from "../AirportIconInput/AirportIconInput";
import { PlaneLanding, PlaneTakeoff, ArrowRightLeft } from "lucide-react";
import { getAirports } from "@api/airportApi";

export default function LocationSwitcher({ from, setFrom, to, setTo }) {
  const [airports, setAirports] = React.useState([]);
  const [loadingAirports, setLoadingAirports] = React.useState(true);
  const [airportsError, setAirportsError] = React.useState(null);

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

      <button onClick={swapLocations} className="swap-button">
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
