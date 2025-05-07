import React from "react";
import { getNames } from "country-list";
import { Button } from "@atoms/Button.jsx";
import { showToast } from "@atoms/Toast/Toast.jsx";
import "./../AdminFlightsModal/AdminFlightsModal.css";
import { createAirline } from "@api/airlineApi.js";

export const AdminNewAirlineModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    code: "",
    country: "",
    logoFileName: "",
  });
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.code.trim()) newErrors.code = "Code is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.logoFileName.trim())
      newErrors.logoFileName = "Logo File Name is required";

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
        const airlinePayload = {
          name: formData.name,
          code: formData.code,
          country: formData.country,
          logoFileName: formData.logoFileName,
        };

        await createAirline(airlinePayload);

        onSave({ ...airlinePayload });
        showToast({
          message: "Airline added successfully",
          type: "success",
        });
      } catch (error) {
        console.error("Error updating airline:", error);
        const message =
          typeof error.response?.data === "string"
            ? error.response.data
            : error.response?.data?.message ||
              "Something went wrong while saving airline data";

        showToast({
          message: `Failed to add airline. ${message}`,
          type: "error",
        });
      }
    }
  };

  return (
    <div className={"modalOverlay"} onClick={onClose}>
      <div className={"modalContent"} onClick={(e) => e.stopPropagation()}>
        <h2>Add New Airline</h2>
        <form onSubmit={handleSubmit}>
          <div className="modalGrid">
            <div className="formField">
              <label>Name</label>
              <input
                name={"name"}
                value={formData.name}
                onChange={handleChange}
                placeholder={"Airline Name"}
              />
              {errors.name && <span className="adminError">{errors.name}</span>}
            </div>
            <div className="formField">
              <label>Code</label>
              <input
                name={"code"}
                value={formData.code}
                onChange={handleChange}
                placeholder={"Airline Code"}
              />
              {errors.code && <span className="adminError">{errors.code}</span>}
            </div>
            <div className="formField">
              <label>Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="" disabled={true}>
                  - Select Country -
                </option>
                {getNames()
                  .sort((a, b) => a.localeCompare(b))
                  .map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
              </select>
              {errors.country && (
                <span className="adminError">{errors.country}</span>
              )}
            </div>
            <div className="formField">
              <label>Logo File Name</label>
              <input
                name={"logoFileName"}
                value={formData.logoFileName}
                onChange={handleChange}
                placeholder={"Logo File Name"}
              />
              {errors.logoFileName && (
                <span className="adminError">{errors.logoFileName}</span>
              )}
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
