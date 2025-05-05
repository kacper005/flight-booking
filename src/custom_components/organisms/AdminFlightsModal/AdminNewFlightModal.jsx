import React from "react";
import PropTypes from "prop-types";
import "./AdminFlightsModal.css";
import { Button } from "@atoms/Button.jsx";
import { getAirportsArray } from "@api/airportApi.js";
import { getAirlines } from "@api/airlineApi.js";
import { createPrice, getPrices } from "@api/priceApi.js";
import { addPricesToFlight, createFlight } from "@api/flightApi.js";
import { showToast } from "@atoms/Toast/Toast.jsx";

export const AdminNewFlightModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = React.useState({
    flightNumber: "",
    airline: { airlineId: "" },
    departureAirport: { airportId: "", code: "" },
    arrivalAirport: { airportId: "", code: "" },
    roundTrip: "",
    status: "",
    departureTime: "",
    arrivalTime: "",
    availableClasses: "",
    extraFeatures: "",
    prices: [
      { price: "", currency: "", priceProviderName: "" },
      { price: "", currency: "", priceProviderName: "" },
    ],
  });
  const [airports, setAirports] = React.useState([]);
  const [airlines, setAirlines] = React.useState([]);
  const [priceProviders, setPriceProviders] = React.useState([]);
  const [currency, setCurrency] = React.useState([]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    const priceMatch = name.match(
      /^(price|currency|priceProviderName)\[(\d+)\]$/,
    );
    if (priceMatch) {
      const [, field, index] = priceMatch;
      setFormData((prev) => {
        const newPrices = [...prev.prices];
        newPrices[index] = {
          ...newPrices[index],
          [field]: value,
        };
        return { ...prev, prices: newPrices };
      });
      return;
    }

    // Handle nested objects like airline, departureAirport, arrivalAirport
    if (name === "airline") {
      setFormData((prev) => ({
        ...prev,
        airline: {
          ...prev.airline,
          airlineId: Number(value),
        },
      }));
    } else if (name === "departureAirport") {
      const selected = airports.find((a) => a.code === value);
      if (!selected) return;
      setFormData((prev) => ({
        ...prev,
        departureAirport: {
          airportId: selected.airportId,
          code: selected.code,
        },
      }));
    } else if (name === "arrivalAirport") {
      const selected = airports.find((a) => a.code === value);
      if (!selected) return;
      setFormData((prev) => ({
        ...prev,
        arrivalAirport: {
          airportId: selected.airportId,
          code: selected.code,
        },
      }));
    } else {
      // Default flat field handling
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let flightId;

    if (
      formData.departureAirport.airportId === formData.arrivalAirport.airportId
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

      const flightResponse = await createFlight(flightPayload);

      flightId = flightResponse.data.flightId;

      showToast({ message: "Flight added successfully", type: "success" });
    } catch (error) {
      console.error("Error saving flight data:", error);
      const message =
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message ||
            "Something went wrong while saving flight data";

      showToast({
        message: `Failed to add flight. ${message}`,
        type: "error",
      });
    }

    try {
      const createdPrices = await Promise.all(
        formData.prices.map((p) =>
          createPrice({
            price: p.price,
            currency: p.currency,
            priceProviderName: p.priceProviderName,
          }),
        ),
      );

      const priceIds = createdPrices.map((res) => ({
        priceId: res.data.priceId,
      }));

      const flightResponseData = await addPricesToFlight(flightId, priceIds);
      const flightData = flightResponseData.data;

      onSave({ flightData });

      showToast({ message: "Prices added successfully", type: "success" });
    } catch (error) {
      console.error("Error creating new price data:", error);
      const message =
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message ||
            "Something went wrong while saving price data";

      showToast({
        message: `Failed to add price. ${message}`,
        type: "error",
      });
    }
  };

  return (
    <div className={"modalOverlay"} onClick={onClose}>
      <div className={"modalContent"} onClick={(e) => e.stopPropagation()}>
        <h2>Add New Flight</h2>
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
            </div>
            <div className={"formField"}>
              <label>Airline</label>
              <select
                name="airline"
                value={formData.airline.airlineId}
                onChange={handleChange}
              >
                <option value={""} disabled={true}>
                  - Select Airline -
                </option>
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
                <option value={""} disabled={true}>
                  - Select Airport -
                </option>
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
                <option value={""} disabled={true}>
                  - Select Airport -
                </option>
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
                <option value={""} disabled={true}>
                  - Select Status -
                </option>
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
                <option value={""} disabled={true}>
                  - Select Status -
                </option>
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
                  name="price[0]"
                  type="number"
                  value={formData.prices?.[0]?.price}
                  onChange={handleChange}
                />
              </div>
              <div className={"formField"} id={"formFieldCurrency"}>
                <label>Currency</label>
                <select
                  name={"currency[0]"}
                  value={formData.prices?.[0]?.currency}
                  onChange={handleChange}
                >
                  <option value={""} disabled={true}>
                    ---
                  </option>
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
                <option value={""} disabled={true}>
                  - Select Provider -
                </option>
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
              </div>
              <div className={"formField"} id={"formFieldCurrency"}>
                <label>Currency</label>
                <select
                  name={"currency[1]"}
                  value={formData.prices?.[1]?.currency}
                  onChange={handleChange}
                >
                  <option value={""} disabled={true}>
                    ---
                  </option>
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
                <option value={""} disabled={true}>
                  - Select Provider -
                </option>
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
            <Button type={"submit"}>Add Flight</Button>
            <Button width={"135px"} onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

AdminNewFlightModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
