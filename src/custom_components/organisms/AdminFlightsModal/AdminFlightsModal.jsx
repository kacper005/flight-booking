import React from "react";
import PropTypes from "prop-types";
import "./AdminFlightsModal.css";
import { Button } from "@atoms/Button";
import { showToast } from "@atoms/Toast/Toast.jsx";
import { updateFlight } from "@api/flightApi.js";

export const AdminFlightsModal = ({ flight, onClose, onSave }) => {
  const [formData, setFormData] = React.useState({ ...flight });

  // Reset formData when flight prop changes
  React.useEffect(() => {
    setFormData({ ...flight });
  }, [flight]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested objects like departureAirport.code
    if (name === "departureAirport") {
      setFormData((prev) => ({
        ...prev,
        departureAirport: { ...prev.departureAirport, code: value },
      }));
    } else if (name === "arrivalAirport") {
      setFormData((prev) => ({
        ...prev,
        arrivalAirport: { ...prev.arrivalAirport, code: value },
      }));
    } else if (name === "roundTrip") {
      setFormData((prev) => ({
        ...prev,
        roundTrip: value === "true",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const flightPayload = {
        flightNumber: formData.flightNumber,
        airline: formData.airline,
        departureAirport: formData.departureAirport,
        arrivalAirport: formData.arrivalAirport,
        roundTrip: formData.roundTrip,
        status: formData.status,
        departureTime: formData.departureTime,
        arrivalTime: formData.arrivalTime,
        prices: [
          {
            price: formData.prices[0].price,
            currency: formData.prices[0].currency,
            priceProviderName: formData.prices[0].priceProviderName,
          },
          {
            price: formData.prices[1].price,
            currency: formData.prices[1].currency,
            priceProviderName: formData.prices[1].priceProviderName,
          },
        ],
        availableClasses: formData.availableClasses,
        extraFeatures: formData.extraFeatures,
      };

      let myString = JSON.stringify(flightPayload);
      console.log("Flight payload: " + myString);

      await updateFlight(flight.id, flightPayload);
      onSave({ ...flight, ...flightPayload });
      onClose();
      showToast({ message: "Flight data saved successfully", type: "success" });
    } catch (error) {
      console.error("Error saving flight data:", error);
      const message =
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message ||
            "Something went wrong while saving flight data";

      showToast({ message: `Failed to add flight. ${message}`, type: "error" });
    }
  };

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Flight</h2>
        <form onSubmit={handleSubmit}>
          <div className="modalGrid">
            <div className={"formField"}>
              <label>Flight Number</label>
              <input
                name="flightNumber"
                value={formData.flightNumber}
                onChange={handleChange}
              />
            </div>
            <div className={"formField"}>
              <label>Airline</label>
              <input
                name="airline"
                value={formData.airline.name}
                onChange={handleChange}
              />
            </div>
            <div className={"formField"}>
              <label>Departure Airport</label>
              <input
                name="departureAirport"
                value={formData.departureAirport.code}
                onChange={handleChange}
              />
            </div>
            <div className={"formField"}>
              <label>Arrival Airport</label>
              <input
                name="arrivalAirport"
                value={formData.arrivalAirport.code}
                onChange={handleChange}
              />
            </div>
            <div className={"formField"}>
              <label>Round Trip</label>
              <select
                name="roundTrip"
                value={formData.roundTrip}
                onChange={handleChange}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <div className={"formField"}>
              <label>Status</label>{" "}
              <select
                name={"status"}
                value={formData.status}
                onChange={handleChange}
              >
                <option value="SCHEDULED">Scheduled</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="DELAYED">Delayed</option>
              </select>
            </div>
            <div className={"formField"}>
              <label>Departure time</label>
              <input
                name="departureTime"
                type="datetime-local"
                value={formData.departureTime}
                onChange={handleChange}
              />
            </div>
            <div className={"formField"}>
              <label>Arrival time</label>
              <input
                name="arrivalTime"
                type="datetime-local"
                value={formData.arrivalTime}
                onChange={handleChange}
              />
            </div>
          </div>
          <h3 className={"h3Price"}>Price 1</h3>
          <div className="modalGrid">
            <div className={"formPriceCurrency"}>
              <div className={"formField"}>
                <label>Price</label>
                <input
                  name="price"
                  type="number"
                  value={formData.prices?.[0]?.price}
                  onChange={handleChange}
                />
              </div>
              <div className={"formField"} id={"formFieldCurrency"}>
                <label>Currency</label>
                <select
                  name={"currency"}
                  value={formData.prices?.[0]?.currency}
                  onChange={handleChange}
                >
                  <option value={"EUR"}>EUR</option>
                  <option value={"GBP"}>GBP</option>
                  <option value={"NOK"}>NOK</option>
                  <option value={"SGD"}>SGD</option>
                  <option value={"USD"}>USD</option>
                </select>
              </div>
            </div>
            <div className={"formField"}>
              <label>Price Provider</label>{" "}
              <select
                name="prices[0].priceProviderName"
                value={formData.prices?.[0]?.priceProviderName || ""}
                onChange={handleChange}
              >
                <option value="Air France Website">Air France Website</option>
                <option value="American Airlines Website">
                  American Airlines Website
                </option>
                <option value="CheapOair">CheapOair</option>
                <option value="eDreams">eDreams</option>
                <option value="Emirates Website">Emirates Website</option>
                <option value="Expedia">Expedia</option>
                <option value="Google Flights">Google Flights</option>
                <option value="JustFly">JustFly</option>
                <option value="Kayak">Kayak</option>
                <option value="Lufthansa Website">Lufthansa Website</option>
                <option value="Momondo">Momondo</option>
                <option value="OneTravel">OneTravel</option>
                <option value="Orbitz">Orbitz</option>
                <option value="Priceline">Priceline</option>
                <option value="Qatar Airways Website">
                  Qatar Airways Website
                </option>
                <option value="Singapore Airlines Website">
                  Singapore Airlines Website
                </option>
                <option value="SkyScanner">SkyScanner</option>
                <option value="Travelocity">Travelocity</option>
              </select>
            </div>
          </div>

          <h3 className={"h3Price"}>Price 2</h3>
          <div className="modalGrid">
            <div className={"formPriceCurrency"}>
              <div className={"formField"}>
                <label>Price</label>
                <input
                  name="price"
                  type="number"
                  value={formData.prices?.[1]?.price}
                  onChange={handleChange}
                />
              </div>
              <div className={"formField"} id={"formFieldCurrency"}>
                <label>Currency</label>
                <select
                  name={"currency"}
                  value={formData.prices?.[1]?.currency}
                  onChange={handleChange}
                >
                  <option value={"EUR"}>EUR</option>
                  <option value={"GBP"}>GBP</option>
                  <option value={"NOK"}>NOK</option>
                  <option value={"SGD"}>SGD</option>
                  <option value={"USD"}>USD</option>
                </select>
              </div>
            </div>
            <div className={"formField"}>
              <label>Price Provider</label>{" "}
              <select
                name="priceProviderName"
                value={formData.prices?.[1]?.priceProviderName || ""}
                onChange={handleChange}
              >
                <option value="Air France Website">Air France Website</option>
                <option value="American Airlines Website">
                  American Airlines Website
                </option>
                <option value="CheapOair">CheapOair</option>
                <option value="eDreams">eDreams</option>
                <option value="Emirates Website">Emirates Website</option>
                <option value="Expedia">Expedia</option>
                <option value="Google Flights">Google Flights</option>
                <option value="JustFly">JustFly</option>
                <option value="Kayak">Kayak</option>
                <option value="Lufthansa Website">Lufthansa Website</option>
                <option value="Momondo">Momondo</option>
                <option value="OneTravel">OneTravel</option>
                <option value="Orbitz">Orbitz</option>
                <option value="Priceline">Priceline</option>
                <option value="Qatar Airways Website">
                  Qatar Airways Website
                </option>
                <option value="Singapore Airlines Website">
                  Singapore Airlines Website
                </option>
                <option value="SkyScanner">SkyScanner</option>
                <option value="Travelocity">Travelocity</option>
              </select>
            </div>
          </div>

          <div className={"formClassFeature"}>
            <label className={"labelClassFeature"}>Available Classes</label>
            <textarea
              name="availableClasses"
              value={formData.availableClasses}
              onChange={handleChange}
              placeholder={"E.g. Economy, Business"}
            />
            <label className={"labelClassFeature"}>Extra Features</label>
            <textarea
              name="extraFeatures"
              value={formData.extraFeatures}
              onChange={handleChange}
            />
          </div>

          <div className="modalActions">
            <Button width={"101px"} margin={"0 32px 0 0"} type={"submit"}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

AdminFlightsModal.propTypes = {
  flight: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
