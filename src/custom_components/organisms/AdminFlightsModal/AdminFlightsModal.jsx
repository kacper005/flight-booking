import React from "react";
import PropTypes from "prop-types";
import { Button } from "@atoms/Button";
import { showToast } from "@atoms/Toast/Toast.jsx";
import { deleteFlight, updateFlight } from "@api/flightApi.js";
import { getAirportsArray } from "@api/airportApi.js";
import { getAirlines } from "@api/airlineApi";
import { getPrices, updatePrice } from "@api/priceApi.js";
import "./AdminFlightsModal.css";

export const AdminFlightsModal = ({ flight, onClose, onSave }) => {
  const [formData, setFormData] = React.useState({ ...flight });
  const [airports, setAirports] = React.useState([]);
  const [airlines, setAirlines] = React.useState([]);
  const [priceProviders, setPriceProviders] = React.useState([]);
  const [currency, setCurrency] = React.useState([]);
  const [errors, setErrors] = React.useState({});

  // Reset formData when flight prop changes
  React.useEffect(() => {
    setFormData({ ...flight });
  }, [flight]);

  React.useEffect(() => {
    const fetchAirports = async () => {
      try {
        const data = await getAirportsArray();
        setAirports(data);
      } catch (error) {
        console.error("Failed to fetch airports:", error);
      }
    };

    fetchAirports();
  }, []);

  React.useEffect(() => {
    const fetchAirlines = async () => {
      try {
        const response = await getAirlines(); // <- response, not array
        setAirlines(response.data); // <- use the actual data array
      } catch (error) {
        console.error("Failed to fetch airlines:", error);
      }
    };

    fetchAirlines();
  }, []);

  React.useEffect(() => {
    const fetchPriceProviders = async () => {
      try {
        const response = await getPrices();
        const providers = [
          ...new Set(response.data.map((p) => p.priceProviderName)),
        ]; // Unique list
        setPriceProviders(providers);
      } catch (error) {
        console.error("Failed to fetch price providers:", error);
      }
    };

    fetchPriceProviders();
  }, []);

  React.useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const response = await getPrices();
        const currencies = [...new Set(response.data.map((p) => p.currency))];
        setCurrency(currencies);
      } catch (error) {
        console.error("Failed to fetch price currencies:", error);
      }
    };

    fetchCurrency();
  }, []);

  const validate = () => {
    let newErrors = {};
    if (!formData.flightNumber.trim())
      newErrors.flightNumber = "Flight number is required";
    if (!formData.departureTime)
      newErrors.departureTime = "Departure time is required";
    if (!formData.arrivalTime)
      newErrors.arrivalTime = "Arrival time is required";

    if (!formData.prices[0].price) {
      newErrors.price1 = "Price is required";
    } else if (formData.prices[0].price <= 0) {
      newErrors.price1 = "Price must be greater than 0";
    }

    if (!formData.prices[1].price) {
      newErrors.price2 = "Price is required";
    } else if (formData.prices[1].price <= 0) {
      newErrors.price2 = "Price must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const arrayMatch = name.match(/(\w+)\[(\d+)]/);
    if (arrayMatch) {
      const [, field, indexStr] = arrayMatch;
      const index = parseInt(indexStr, 10);

      setFormData((prev) => {
        const updatedPrices = [...(prev.prices || [])];
        updatedPrices[index] = {
          ...updatedPrices[index],
          [field]: field === "price" ? parseFloat(value) : value,
        };
        return { ...prev, prices: updatedPrices };
      });
      return;
    }

    const upperValue = value.toUpperCase();

    // Handle nested objects like departureAirport.code
    if (name === "departureAirport") {
      const matched = airports.find((a) => a.code === upperValue);
      setFormData((prev) => ({
        ...prev,
        departureAirport: matched
          ? { ...matched, code: upperValue }
          : { ...prev.departureAirport, code: upperValue },
      }));
    } else if (name === "arrivalAirport") {
      const matched = airports.find((a) => a.code === upperValue);
      setFormData((prev) => ({
        ...prev,
        arrivalAirport: matched
          ? { ...matched, code: upperValue }
          : { ...prev.arrivalAirport, code: value },
      }));
    } else if (name === "roundTrip") {
      setFormData((prev) => ({
        ...prev,
        roundTrip: value === "true",
      }));
    } else if (name === "airline") {
      const selectedId = parseInt(value);
      const selectedAirline = airlines.find((a) => a.airlineId === selectedId);
      setFormData((prev) => ({
        ...prev,
        airline: selectedAirline || prev.airline,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this flight?",
    );
    if (userConfirmed) {
      try {
        await deleteFlight(flight.flightId);
        showToast({
          message: "Flight deleted successfully",
          type: "success",
        });
        onClose();
      } catch (error) {
        console.error("Error deleting flight:", error);
        showToast({
          message: "Failed to delete flight",
          type: "error",
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let flightAdded,
      priceAdded = false;

    if (validate()) {
      if (
        formData.departureAirport.airportId ===
        formData.arrivalAirport.airportId
      ) {
        const userConfirmed = window.confirm(
          "Departure and arrival airports are the same. Do you want to continue?",
        );

        if (!userConfirmed) {
          return; // Stops form submission if user cancels
        }
      }

      try {
        const flightPayload = {
          flightNumber: formData.flightNumber,
          departureTime: formData.departureTime,
          arrivalTime: formData.arrivalTime,
          roundTrip: formData.roundTrip,
          extraFeatures: formData.extraFeatures,
          availableClasses: formData.availableClasses,
          status: formData.status,
          airline: {
            airlineId: formData.airline.airlineId,
          },
          departureAirport: { airportId: formData.departureAirport.airportId },
          arrivalAirport: { airportId: formData.arrivalAirport.airportId },
        };

        await updateFlight(flight.flightId, flightPayload);
        onSave({ ...flight, ...flightPayload });
        flightAdded = true;
      } catch (error) {
        console.error("Error saving flight data:", error);
        const message =
          typeof error.response?.data === "string"
            ? error.response.data
            : error.response?.data?.message ||
              "Something went wrong while saving flight data";

        showToast({
          message: `Failed to update flight. ${message}`,
          type: "error",
        });
      }

      try {
        const updatePromises = formData.prices.map((p) =>
          updatePrice(p.priceId, {
            priceId: p.priceId,
            price: p.price,
            currency: p.currency,
            priceProviderName: p.priceProviderName,
          }),
        );

        await Promise.all(updatePromises);
        priceAdded = true;
      } catch (error) {
        console.error("Error saving price data:", error);
        const message =
          typeof error.response?.data === "string"
            ? error.response.data
            : error.response?.data?.message ||
              "Something went wrong while saving price data";

        showToast({
          message: `Failed to update price. ${message}`,
          type: "error",
        });
      }

      if (flightAdded && priceAdded) {
        showToast({
          message: "All data saved successfully",
          type: "success",
        });
      } else if (flightAdded) {
        showToast({
          message: "Flight data saved successfully",
          type: "success",
        });
      } else if (priceAdded) {
        showToast({
          message: "Price data saved successfully",
          type: "success",
        });
      }
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
                placeholder={"E.g. AB123"}
              />
              {errors.flightNumber && (
                <small className={"adminError"}>{errors.flightNumber}</small>
              )}
            </div>
            <div className={"formField"}>
              <label>Airline</label>
              <select
                name="airline"
                value={formData.airline.airlineId}
                onChange={handleChange}
              >
                {airlines.map((airline) => (
                  <option key={airline.airlineId} value={airline.airlineId}>
                    {airline.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={"formField"}>
              <label>Departure Airport</label>
              <select
                name={"departureAirport"}
                value={formData.departureAirport.code}
                onChange={handleChange}
              >
                {airports
                  .slice() // make a copy to avoid mutating state
                  .sort((a, b) => a.city.localeCompare(b.city))
                  .map((airport) => (
                    <option key={airport.airportId} value={airport.code}>
                      {airport.city} ({airport.code})
                    </option>
                  ))}
              </select>
            </div>
            <div className={"formField"}>
              <label>Arrival Airport</label>
              <select
                name="arrivalAirport"
                value={formData.arrivalAirport.code}
                onChange={handleChange}
              >
                {airports
                  .slice() // make a copy to avoid mutating state
                  .sort((a, b) => a.city.localeCompare(b.city))
                  .map((airport) => (
                    <option key={airport.airportId} value={airport.code}>
                      {airport.city} ({airport.code})
                    </option>
                  ))}
              </select>
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
              {errors.departureTime && (
                <small className={"adminError"}>{errors.departureTime}</small>
              )}
            </div>
            <div className={"formField"}>
              <label>Arrival time</label>
              <input
                name="arrivalTime"
                type="datetime-local"
                value={formData.arrivalTime}
                onChange={handleChange}
              />
              {errors.arrivalTime && (
                <small className={"adminError"}>{errors.arrivalTime}</small>
              )}
            </div>
          </div>
          <h3 className={"h3Price"}>Price 1</h3>
          <div className="modalGrid">
            <div className={"formPriceCurrency"}>
              <div className={"formField"}>
                <label>Price</label>
                <input
                  name="price[0]"
                  type="number"
                  value={formData.prices?.[0]?.price}
                  onChange={handleChange}
                />
                {errors.price1 && (
                  <small className={"adminError"}>{errors.price1}</small>
                )}
              </div>
              <div className={"formField"} id={"formFieldCurrency"}>
                <label>Currency</label>
                <select
                  name={"currency[0]"}
                  value={formData.prices?.[0]?.currency}
                  onChange={handleChange}
                >
                  {currency
                    .slice() // make a copy to avoid mutating state
                    .sort((a, b) => a.localeCompare(b))
                    .map((provider, i) => (
                      <option key={i} value={provider}>
                        {provider}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className={"formField"}>
              <label>Price Provider</label>{" "}
              <select
                name="priceProviderName[0]"
                value={formData.prices?.[0]?.priceProviderName || ""}
                onChange={handleChange}
              >
                {priceProviders
                  .slice() // make a copy to avoid mutating state
                  .sort((a, b) => a.localeCompare(b))
                  .map((provider, i) => (
                    <option key={i} value={provider}>
                      {provider}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <h3 className={"h3Price"}>Price 2</h3>
          <div className="modalGrid">
            <div className={"formPriceCurrency"}>
              <div className={"formField"}>
                <label>Price</label>
                <input
                  name="price[1]"
                  type="number"
                  value={formData.prices?.[1]?.price}
                  onChange={handleChange}
                />
                {errors.price2 && (
                  <small className={"adminError"}>{errors.price2}</small>
                )}
              </div>
              <div className={"formField"} id={"formFieldCurrency"}>
                <label>Currency</label>
                <select
                  name={"currency[1]"}
                  value={formData.prices?.[1]?.currency}
                  onChange={handleChange}
                >
                  {currency
                    .slice() // make a copy to avoid mutating state
                    .sort((a, b) => a.localeCompare(b))
                    .map((provider, i) => (
                      <option key={i} value={provider}>
                        {provider}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className={"formField"}>
              <label>Price Provider</label>{" "}
              <select
                name="priceProviderName[1]"
                value={formData.prices?.[1]?.priceProviderName || ""}
                onChange={handleChange}
              >
                {priceProviders
                  .slice() // make a copy to avoid mutating state
                  .sort((a, b) => a.localeCompare(b))
                  .map((provider, i) => (
                    <option key={i} value={provider}>
                      {provider}
                    </option>
                  ))}
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
              placeholder={"E.g. WiFi, Extra Legroom"}
            />
          </div>
          <div className="modalActions">
            <Button width={"101px"} type={"submit"}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </div>
          <div className="bottomModalActions">
            <Button
              bgColor={"var(--buttonColorRed)"}
              hoverBgColor={"var(--buttonColorRedHover)"}
              onClick={handleDelete}
            >
              Delete
            </Button>
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
