import React from "react";
import { getNames } from "country-list";
import { createAirport } from "@api/airportApi.js";
import { Button } from "@atoms/Button.jsx";
import { showToast } from "@atoms/Toast/Toast.jsx";
import "./../AdminFlightsModal/AdminFlightsModal.css";

export const AdminNewAirportModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = React.useState({
    code: "",
    city: "",
    country: "",
    name: "",
  });
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.code.trim()) newErrors.code = "Code is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.name.trim()) newErrors.name = "Name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const airportPayload = {
          code: formData.code,
          city: formData.city,
          country: formData.country,
          name: formData.name,
        };

        await createAirport(airportPayload);

        onSave({ ...airportPayload });
        showToast({
          message: "Airport added successfully",
          type: "success",
        });
      } catch (error) {
        console.error("Error updating airport:", error);
        const message =
          typeof error.response?.data === "string"
            ? error.response.data
            : error.response?.data?.message ||
              "Something went wrong while saving airport data";

        showToast({
          message: `Failed to add airline. ${message}`,
          type: "error",
        });
      }
    }
  };

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <h2>Add New Airport</h2>
        <form onSubmit={handleSubmit}>
          <div className="modalGrid">
            <div className="formField">
              <label>Code</label>
              <input
                name={"code"}
                value={formData.code}
                onChange={handleChange}
                placeholder="Airport code"
              />
              {errors.code && <span className="adminError">{errors.code}</span>}
            </div>
            <div className="formField">
              <label>City</label>
              <input
                name={"city"}
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
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
                <option value="" disabled>
                  - Select Country -
                </option>
                {getNames().map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.country && (
                <span className="adminError">{errors.country}</span>
              )}
            </div>
            <div className="formField">
              <label>Name</label>
              <input
                name={"name"}
                value={formData.name}
                onChange={handleChange}
                placeholder="Airport name"
              />
              {errors.name && <span className="adminError">{errors.name}</span>}
            </div>
          </div>
          <div className="modalActions">
            <Button type={"submit"}>Add Airline</Button>
            <Button width={"135px"} onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
