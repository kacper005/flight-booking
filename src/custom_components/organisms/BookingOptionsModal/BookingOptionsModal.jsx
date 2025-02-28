import React from "react";
import "./BookingOptionsModal.css";
import { Button } from "@/custom_components/atoms/Button";

export default function BookingOptionsModal() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [cabinClass, setCabinClass] = React.useState("Economy");
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
      <Button onClick={() => setIsOpen(!isOpen)}>
        {totalTravelers} {travelerText}, {cabinClass}
      </Button>

      {isOpen && (
        <div className="dropdown">
          <BookingDialog
            passengers={passengers}
            setPassengers={setPassengers}
            cabinClass={cabinClass}
            setCabinClass={setCabinClass}
            totalTravelers={totalTravelers}
          />
        </div>
      )}
    </div>
  );
}

function BookingDialog({
  passengers,
  setPassengers,
  cabinClass,
  setCabinClass,
  totalTravelers,
}) {
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
      {totalTravelers >= 10 && (
        <Typography as="h4">This is a group booking</Typography>
      )}
      {[
        { label: "Adults", type: "adult" },
        { label: "Children (2-11 years)", type: "child" },
        { label: "Infants (0-23 months)", type: "infant" },
      ].map(({ label, type }) => (
        <div key={type} className="passenger-row">
          <span>{label}</span>
          <div className="counter">
            <button
              disabled={passengers[type] === 0}
              onClick={() => handleChange(type, -1)}
            >
              -
            </button>
            <span className="count-value">{passengers[type]}</span>
            <button
              disabled={totalTravelers >= 10}
              onClick={() => handleChange(type, 1)}
            >
              +
            </button>
          </div>
        </div>
      ))}

      <h2>Class</h2>
      <div className="cabin-classes">
        {["Economy", "Premium Economy", "Business", "First class"].map(
          (cls) => (
            <button
              key={cls}
              className={cabinClass === cls ? "selected" : ""}
              onClick={() => setCabinClass(cls)}
            >
              {cls}
            </button>
          )
        )}
      </div>
    </div>
  );
}
