import React from "react";
import "./BookingOptionsModal.css";
import { Button } from "@/custom_components/atoms/Button";

export default function BookingOptionsModal() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [passengers, setPassengers] = React.useState({
    adult: 1,
    child: 0,
    infant: 0,
  });

  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const totalTravelers = Object.values(passengers).reduce(
    (sum, num) => sum + num,
    0
  );
  const travelerText = totalTravelers === 1 ? "Traveller" : "Travellers";

  return (
    <div className="booking-container" ref={dropdownRef}>
      <Button
        height={"60px"}
        width={"100%"}
        bgColor={"var(--white)"}
        color={"var(--black)"}
        borderRadius={"8px"}
        textAlign={"left"}
        border={"1px solid #cccccc"}
        onClick={() => setIsOpen(!isOpen)}
      >
        {totalTravelers} {travelerText}
      </Button>

      {isOpen && (
        <div className="dropdown">
          <BookingDialog
            passengers={passengers}
            setPassengers={setPassengers}
            totalTravelers={totalTravelers}
          />
        </div>
      )}
    </div>
  );
}

function BookingDialog({ passengers, setPassengers, totalTravelers }) {
  const handleChange = (type, delta) => {
    if (totalTravelers + delta > 10) return;
    setPassengers((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }));
  };

  return (
    <div className="booking-dialog">
      <h2>Travellers</h2>
      {totalTravelers >= 10 && <h4>This is a group booking</h4>}
      {[
        { label: "Adults", type: "adult" },
        { label: "Children (2-11 years)", type: "child" },
        { label: "Infants (0-23 months)", type: "infant" },
      ].map(({ label, type }) => (
        <div key={type} className="passenger-row">
          <p>{label}</p>
          <div className="counter">
            <button
              disabled={passengers[type] === 0}
              onClick={() => handleChange(type, -1)}
            >
              -
            </button>
            <p className="count-value">{passengers[type]}</p>
            <button
              disabled={totalTravelers >= 10}
              onClick={() => handleChange(type, 1)}
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
