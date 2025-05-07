import React from "react";
import { getNames } from "country-list";
import { Button } from "@atoms/Button";
import { showToast } from "@atoms/Toast/Toast.jsx";
import { deleteAirline, updateAirline } from "@api/airlineApi.js";
import { getFlights } from "@api/flightApi.js";
import "./../AdminFlightsModal/AdminFlightsModal.css";

export const AdminAirlinesModal = ({ airline, onClose, onSave }) => {
  const [formData, setFormData] = React.useState({ ...airline });
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    setFormData({ ...airline });
  }, [airline]);

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.code.trim()) newErrors.code = "Code is required";
    if (!formData.logoFileName.trim())
      newErrors.logoFileName = "Logo File Name is required";

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
      console.log("Flights retrieved successfully");
      //console.log(JSON.stringify(flights));
      for (const flight of flights.data) {
        if (flight.airline.airlineId === airline.airlineId) {
          alert(
            "This airline is connected to one or more existing flights.\nPlease delete the flights before deleting the airline.",
          );
          return;
        }
      }
    } catch (error) {
      console.error("Error fetching flights:", error);
    }

    const userConfirmed = window.confirm(
      "Are you sure you want to delete this airline?",
    );
    if (userConfirmed) {
      try {
        await deleteAirline(airline.airlineId);
        showToast({
          message: "Airline deleted successfully",
          type: "success",
        });
        onClose();
      } catch (error) {
        console.error("Error deleting airline:", error);
        showToast({
          message: "Failed to delete airline",
          type: "error",
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const airlinePayload = {
          airlineId: airline.airlineId,
          name: formData.name,
          code: formData.code,
          country: formData.country,
          logoFileName: formData.logoFileName,
        };

        await updateAirline(airline.airlineId, airlinePayload);
        onSave({ ...airline, ...airlinePayload });
        showToast({
          message: "Airline updated successfully",
          type: "success",
        });
      } catch (error) {
        const message =
          typeof error.response?.data === "string"
            ? error.response.data
            : error.response?.data?.message ||
              "Something went wrong while saving airline data";

        showToast({
          message: `Failed to update airline. ${message}`,
          type: "error",
        });
      }
    }
  };

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Airline</h2>
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
                {getNames()
                  .sort((a, b) => a.localeCompare(b))
                  .map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
              </select>
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
