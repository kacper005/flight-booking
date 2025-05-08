import React from "react";
import { ButtonSmall } from "@atoms/ButtonSmall.jsx";
import { Button } from "@atoms/Button.jsx";
import LoadingSpinner from "@atoms/LoadingSpinner";
import { getAirlines, updateAirline } from "@api/airlineApi.js";
import { AdminAirlinesModal } from "@organisms/AdminAirlinesModal/AdminAirlinesModal.jsx";
import { AdminNewAirlineModal } from "@organisms/AdminAirlinesModal/AdminNewAirlineModal.jsx";
import "./AdminFlights.css";
import "./AdminAirlines.css";

export const AdminAirlines = () => {
  const [airlines, setAirlines] = React.useState([]);
  const [loadingAirlines, setLoading] = React.useState(true);
  const [airlinesError, setError] = React.useState(null);
  const [selectedAirline, setSelectedAirline] = React.useState(null);
  const [showAddAirlineModal, setShowAddAirlineModal] = React.useState(false);

  const getSortedAirlinesTable = async () => {
    const res = await getAirlines();
    const sorted = res.data.sort((a, b) => a.name.localeCompare(b.name));
    setAirlines(sorted);
  };

  React.useEffect(() => {
    const fetchAirlines = async () => {
      try {
        await getSortedAirlinesTable();
      } catch (err) {
        setError(err.message || "Failed to load airlines.");
      } finally {
        setLoading(false);
      }
    };

    fetchAirlines();
  }, []);

  const handleSave = async (updatedAirline) => {
    try {
      await updateAirline(updatedAirline.airlineId, updatedAirline);
      await getSortedAirlinesTable();
      setSelectedAirline(null);
    } catch (error) {
      console.error("Error updating airline:", error);
    }
  };

  const handleClose = async () => {
    try {
      await getSortedAirlinesTable();
      setSelectedAirline(null);
    } catch (error) {
      console.error("Error updating airline:", error);
    }
  };

  const handleAddAirline = async () => {
    try {
      toggleModal();
      await getSortedAirlinesTable();
    } catch (error) {
      console.error("Error updating airline:", error);
    }
  };

  const toggleModal = () => {
    setShowAddAirlineModal(!showAddAirlineModal);
  };

  // Prevent scrolling behind modal when modal is open
  if (selectedAirline || showAddAirlineModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div className="adminClassContainer">
      <h1>Edit Airlines</h1>
      <Button margin={"0 0 20px 0"} onClick={toggleModal}>
        Add Airline
      </Button>
      {loadingAirlines && <LoadingSpinner />}
      {airlinesError && <h3>{airlinesError}</h3>}
      {!loadingAirlines && airlines.length === 0 && <h3>No airlines found</h3>}

      {!loadingAirlines && airlines.length > 0 && (
        <table className="adminTable">
          <thead>
            <tr>
              <th className="colAirlineName">Name</th>
              <th className="colAirlineCode">Code</th>
              <th className="colAirlineCountry">Country</th>
              <th className="colLogoName">Logo</th>
              <th className="colEdit"></th>
            </tr>
          </thead>
          <tbody>
            {airlines.map((airline, index) => (
              <tr
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedAirline(airline);
                }}
              >
                <td className="colAirlineName">{airline.name}</td>
                <td className="colAirlineCode">{airline.code}</td>
                <td className="colAirlineCountry">{airline.country}</td>
                <td className="colLogoName">
                  <img
                    style={{ width: "35px" }}
                    src={`/airline_logos/${airline.logoFileName}.png`}
                  />
                </td>
                <td className="colEdit">
                  <ButtonSmall
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedAirline(airline);
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

      {selectedAirline && (
        <AdminAirlinesModal
          airline={selectedAirline}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
      {showAddAirlineModal && (
        <AdminNewAirlineModal
          addNewAirline={toggleModal}
          onClose={toggleModal}
          onSave={handleAddAirline}
        />
      )}
    </div>
  );
};
