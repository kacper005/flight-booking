import React from "react";
import "./SwitchButton.css";
import { IconInput } from "../IconInput/IconInput";
import { PlaneLanding } from "lucide-react";
import { PlaneTakeoff } from "lucide-react";
import { ArrowRightLeft } from "lucide-react";

export default function SwitchButton() {
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");

  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="switch-button-container">
      <IconInput
        type={"text"}
        placeholder={"From"}
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        required={true}
        icon={PlaneTakeoff}
      />

      {/* Swap Button */}
      <button onClick={swapLocations} className="swap-button">
        <ArrowRightLeft className="swap-icon" />
      </button>

      {/* To Input */}
      <IconInput
        type={"text"}
        placeholder={"To"}
        value={to}
        onChange={(e) => setTo(e.target.value)}
        required={true}
        icon={PlaneLanding}
      />
    </div>
  );
}
