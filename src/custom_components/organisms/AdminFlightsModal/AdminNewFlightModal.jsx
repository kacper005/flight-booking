import React from "react";
import { getAirlines } from "@api/airlineApi.js";
import { getAirportsArray } from "@api/airportApi.js";
import { createPrice, getPrices } from "@api/priceApi.js";
import { addPricesToFlight, createFlight } from "@api/flightApi.js";
import { Button } from "@atoms/Button.jsx";
import { showToast } from "@atoms/Toast/Toast.jsx";
import "./AdminFlightsModal.css";

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
  const [errors, setErrors] = React.useState({});

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
        const response = await getAirlines();
        setAirlines(response.data);
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
        ];
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
    if (!formData.airline.airlineId) newErrors.airline = "Airline is required";
    if (!formData.departureAirport.airportId)
      newErrors.departureAirport = "Departure airport is required";
    if (!formData.arrivalAirport.airportId)
      newErrors.arrivalAirport = "Arrival airport is required";
    if (!formData.roundTrip)
      newErrors.roundTrip = "Round trip status is required";
    if (!formData.status) newErrors.status = "Flight status is required";
    if (!formData.departureTime)
      newErrors.departureTime = "Departure time is required";
    if (!formData.arrivalTime)
      newErrors.arrivalTime = "Arrival time is required";

    if (!formData.prices[0].price) {
      newErrors.price1 = "Price is required";
    } else if (formData.prices[0].price <= 0) {
      newErrors.price1 = "Price must be greater than 0";
    }
    if (!formData.prices[0].currency)
      newErrors.currency1 = "Currency is required";
    if (!formData.prices[0].priceProviderName)
      newErrors.priceProviderName1 = "Price provider is required";

    if (!formData.prices[1].price) {
      newErrors.price2 = "Price is required";
    } else if (formData.prices[1].price <= 0) {
      newErrors.price2 = "Price must be greater than 0";
    }
    if (!formData.prices[1].currency)
      newErrors.currency2 = "Currency is required";
    if (!formData.prices[1].priceProviderName)
      newErrors.priceProviderName2 = "Price provider is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const priceMatch = name.match(
      /^(price|currency|priceProviderName)\[(\d+)\]$/
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
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      let flightId;
      let flightAdded,
        priceAdded = false;

      if (
        formData.departureAirport.airportId ===
        formData.arrivalAirport.airportId
      ) {
        const userConfirmed = window.confirm(
          "Departure and arrival airports are the same. Do you want to continue?"
        );

        if (!userConfirmed) {
          return;
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

        flightAdded = true;
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
            })
          )
        );

        const priceIds = createdPrices.map((res) => ({
          priceId: res.data.priceId,
        }));

        const flightResponseData = await addPricesToFlight(flightId, priceIds);
        const flightData = flightResponseData.data;

        onSave({ flightData });

        priceAdded = true;
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

      if (flightAdded && priceAdded) {
        showToast({
          message: "All data added successfully",
          type: "success",
        });
      } else if (flightAdded) {
        showToast({ message: "Flight added successfully", type: "success" });
      } else if (priceAdded) {
        showToast({ message: "Price added successfully", type: "success" });
      }
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
                <option value={""} disabled={true}>
                  - Select Airline -
                </option>
                {airlines.map((airline) => (
                  <option key={airline.airlineId} value={airline.airlineId}>
                    {airline.name}
                  </option>
                ))}
              </select>
              {errors.airline && (
                <small className={"adminError"}>{errors.airline}</small>
              )}
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
                  .slice()
                  .sort((a, b) => a.city.localeCompare(b.city))
                  .map((airport) => (
                    <option key={airport.airportId} value={airport.code}>
                      {airport.city} ({airport.code})
                    </option>
                  ))}
              </select>
              {errors.departureAirport && (
                <small className={"adminError"}>
                  {errors.departureAirport}
                </small>
              )}
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
                  .slice()
                  .sort((a, b) => a.city.localeCompare(b.city))
                  .map((airport) => (
                    <option key={airport.airportId} value={airport.code}>
                      {airport.city} ({airport.code})
                    </option>
                  ))}
              </select>
              {errors.arrivalAirport && (
                <small className={"adminError"}>{errors.arrivalAirport}</small>
              )}
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
              {errors.roundTrip && (
                <small className={"adminError"}>{errors.roundTrip}</small>
              )}
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
              {errors.status && (
                <small className={"adminError"}>{errors.status}</small>
              )}
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
                  <option value={""} disabled={true}>
                    ---
                  </option>
                  {currency
                    .slice()
                    .sort((a, b) => a.localeCompare(b))
                    .map((provider, i) => (
                      <option key={i} value={provider}>
                        {provider}
                      </option>
                    ))}
                </select>
                {errors.currency1 && (
                  <small className={"adminError"}>{errors.currency1}</small>
                )}
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
                  .slice()
                  .sort((a, b) => a.localeCompare(b))
                  .map((provider, i) => (
                    <option key={i} value={provider}>
                      {provider}
                    </option>
                  ))}
              </select>
              {errors.priceProviderName1 && (
                <small className={"adminError"}>
                  {errors.priceProviderName1}
                </small>
              )}
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
                  <option value={""} disabled={true}>
                    ---
                  </option>
                  {currency
                    .slice()
                    .sort((a, b) => a.localeCompare(b))
                    .map((provider, i) => (
                      <option key={i} value={provider}>
                        {provider}
                      </option>
                    ))}
                </select>
                {errors.currency2 && (
                  <small className={"adminError"}>{errors.currency2}</small>
                )}
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
                  .slice()
                  .sort((a, b) => a.localeCompare(b))
                  .map((provider, i) => (
                    <option key={i} value={provider}>
                      {provider}
                    </option>
                  ))}
              </select>
              {errors.priceProviderName2 && (
                <small className={"adminError"}>
                  {errors.priceProviderName2}
                </small>
              )}
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
