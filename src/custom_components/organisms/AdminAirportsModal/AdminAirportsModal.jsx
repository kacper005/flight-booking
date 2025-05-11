import React from "react";
import { getNames } from "country-list";
import { getFlights } from "@api/flightApi.js";
import { deleteAirport, updateAirport } from "@api/airportApi.js";
import { Button } from "@atoms/Button";
import { showToast } from "@atoms/Toast/Toast.jsx";
import "./../AdminFlightsModal/AdminFlightsModal.css";

export const AdminAirportsModal = ({ airport, onClose, onSave }) => {
  const [formData, setFormData] = React.useState({ ...airport });
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    setFormData({ ...airport });
  }, [airport]);

  const validate = () => {
    let newErrors = {};
    if (!formData.code.trim()) newErrors.code = "Code is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.name.trim()) newErrors.name = "Name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const flights = await getFlights();
      for (const flight of flights.data) {
        if (
          flight.departureAirport.airportId === airport.airportId ||
          flight.arrivalAirport.airportId === airport.airportId
        ) {
          alert(
            "This airport is connected to one or more existing flights.\nPlease delete the flights before deleting the airport."
          );
          return;
        }
      }
    } catch (error) {
      console.error("Error fetching flights:", error);
    }

    const userConfirmed = window.confirm(
      "Are you sure you want to delete this airport?"
    );
    if (userConfirmed) {
      try {
        await deleteAirport(airport.airportId);
        showToast({
          message: "Airport deleted successfully",
          type: "success",
        });
        onClose();
      } catch (error) {
        console.error("Error deleting airport:", error);
        showToast({
          message: "Failed to delete airport",
          type: "error",
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const airportPayload = {
          airportId: airport.airportId,
          code: formData.code,
          city: formData.city,
          country: formData.country,
          name: formData.name,
        };

        await updateAirport(airport.airportId, airportPayload);
        onSave({ ...airport, ...airportPayload });
        showToast({
          message: "Airport updated successfully",
          type: "success",
        });
      } catch (error) {
        const message =
          typeof error.response?.data === "string"
            ? error.response.data
            : error.response?.data?.message ||
              "Something went wrong while saving airport data";

        showToast({
          message: `Failed to update airport. ${message}`,
          type: "error",
        });
      }
    }
  };

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Airport</h2>
        <form onSubmit={handleSubmit}>
          <div className="modalGrid">
            <div className="formField">
              <label>Code</label>
              <input
                name={"code"}
                value={formData.code}
                onChange={handleChange}
                placeholder={"Airport Code"}
              />
              {errors.code && <span className="adminError">{errors.code}</span>}
            </div>
            <div className="formField">
              <label>City</label>
              <input
                name={"city"}
                value={formData.city}
                onChange={handleChange}
                placeholder={"Airport City"}
              />
              {errors.city && <span className="adminError">{errors.city}</span>}
            </div>
            <div className="formField">
              <label>Country</label>
              <select
                name={"country"}
                value={formData.country}
                onChange={handleChange}
              >
                {getNames().map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div className="formField">
              <label>Name</label>
              <input
                name={"name"}
                value={formData.name}
                onChange={handleChange}
                placeholder={"Airport Name"}
              />
              {errors.name && <span className="adminError">{errors.name}</span>}
            </div>
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
