import React from "react";
import { ButtonSmall } from "@atoms/ButtonSmall.jsx";
import { Button } from "@atoms/Button.jsx";
import LoadingSpinner from "@atoms/LoadingSpinner";
import { getAirports, updateAirport } from "@api/airportApi.js";
import "./AdminFlights.css";

export const AdminAirports = () => {
  const [airports, setAirports] = React.useState([]);
  const [loadingAirports, setLoading] = React.useState(true);
  const [airportsError, setError] = React.useState(null);
  const [selectedAirport, setSelectedAirport] = React.useState(null);
  const [showAddAirportModal, setShowAddAirportModal] = React.useState(false);

  React.useEffect(() => {
    const fetchAirports = async () => {
      try {
        const res = await getAirports();
        const sorted = res.data.sort((a, b) => a.code.localeCompare(b.code));
        setAirports(sorted);
      } catch (err) {
        setError(err.message || "Failed to load airports.");
      } finally {
        setLoading(false);
      }
    };

    fetchAirports();
  }, []);

  const handleSave = async (updatedAirport) => {
    try {
      await updatedAirport(updatedAirport.airportId, updatedAirport);
      const res = await getAirports();
      const sorted = res.data.sort((a, b) => a.code.localeCompare(b.code));
      setAirports(sorted);
      setSelectedAirport(null);
    } catch (error) {
      console.error("Error updating airport:", error);
    }
  };

  const handleClose = async () => {
    try {
      const res = await getAirports();
      const sorted = res.data.sort((a, b) => a.code.localeCompare(b.code));
      setAirports(sorted);
      setSelectedAirport(null);
    } catch (error) {
      console.error("Error updating airport:", error);
    }
  };

  const handleAddAirport = async () => {
    try {
      toggleModal();
      const res = await getAirports();
      const sorted = res.data.sort((a, b) => a.code.localeCompare(b.code));
      setAirports(sorted);
    } catch (error) {
      console.error("Error updating airport:", error);
    }
  };

  const toggleModal = () => {
    setShowAddAirportModal(!showAddAirportModal);
  };

  // Prevent scrolling behind modal when modal is open
  if (selectedAirport || showAddAirportModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div className="adminClassContainer">
      <h1>Edit Airports</h1>
      <Button margin={"0 0 20px 0"} onClick={toggleModal}>
        Add Airline
      </Button>
      {loadingAirports && <LoadingSpinner />}
      {airportsError && <h3>{airportsError}</h3>}
      {!loadingAirports && airports.length === 0 && <h3>No airports found</h3>}

      {!loadingAirports && airports.length > 0 && (
        <table className="adminTable">
          <thead>
            <tr>
              <th className="colAirportCode">Code</th>
              <th className="colAirportCity">City</th>
              <th className="colAirportCountry">Country</th>
              <th className="colAirportName">Name</th>
              <th className="colEdit"></th>
            </tr>
          </thead>
          <tbody>
            {airports.map((airport, index) => (
              <tr
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedAirport(airport);
                }}
              >
                <td className="colAirportCode">{airport.code}</td>
                <td className="colAirportCity">{airport.city}</td>
                <td className="colAirportCountry">{airport.country}</td>
                <td className="colAirportName">{airport.name}</td>
                <td className="colEdit">
                  <ButtonSmall
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedAirport(airport);
                    }}
                  >
                    Edit
                  </ButtonSmall>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* TODO: Modal Edit Airline */}

      {/* TODO: Modal Add Airline */}
    </div>
  );
};
