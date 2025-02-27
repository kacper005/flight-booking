import React from "react";
import "./LocationSwitcher.css";
import { IconInput } from "../IconInput/IconInput";
import { PlaneLanding } from "lucide-react";
import { PlaneTakeoff } from "lucide-react";
import { ArrowRightLeft } from "lucide-react";

export default function LocationSwitcher() {
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");

  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  const airports = [
    "New York (JFK)",
    "Los Angeles (LAX)",
    "Oslo (OSL)",
    "Ålesund (AES)",
    "Amsterdam (AMS)",
    "London Heathrow (LHR)",
    "Zurich (ZRH)",
    "Rome (FCO)",
    "Paris (CDG)",
    "Dallas (DFD)",
    "Chicago (ORD)",
    "Frankfurt (FRA)",
    "Tokyo (HND)",
    "Dubai (DXB)",
    "Doha (DOH)",
    "Sydney (SYD)",
    "Singapore (SIN)",
  ];

  const fromOptions = airports.filter((airport) => airport !== to);
  const toOptions = airports.filter((airport) => airport !== from);

  return (
    <div className="switch-button-container">
      <IconInput
        type="text"
        placeholder="From"
        value={from}
        required={true}
        list="from-airports"
        options={fromOptions}
        icon={PlaneTakeoff}
        onChange={(e) => setFrom(e.target.value)}
      />

      <button onClick={swapLocations} className="swap-button">
        <ArrowRightLeft className="swap-icon" />
      </button>

      <IconInput
        type="text"
        placeholder="To"
        value={to}
        required={true}
        list="to-airports"
        options={toOptions}
        icon={PlaneLanding}
        onChange={(e) => setTo(e.target.value)}
      />
    </div>
  );
}
