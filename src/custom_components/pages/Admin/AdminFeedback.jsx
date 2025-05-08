import React from "react";
import { ButtonSmall } from "@atoms/ButtonSmall.jsx";
import LoadingSpinner from "@atoms/LoadingSpinner";
import { getFeedback } from "@api/feedbackApi.js";
import { formatDateTime } from "@formatters/DateFormatters";
import { AdminFeedbackModal } from "@organisms/AdminFeedbackModal.jsx";
import "./AdminFlights.css";

export const AdminFeedback = () => {
  const [allFeedback, setAllFeedback] = React.useState([]);
  const [loadingFeedback, setLoading] = React.useState(true);
  const [feedbackError, setError] = React.useState(null);
  const [selectedFeedback, setSelectedFeedback] = React.useState(null);

  const getSortedFeedbackTable = async () => {
    const res = await getFeedback();
    const sorted = res.data.sort((a, b) =>
      a.createdAt.localeCompare(b.createdAt),
    );
    setAllFeedback(sorted);
  };

  React.useEffect(() => {
    const fetchFeedback = async () => {
      try {
        await getSortedFeedbackTable();
      } catch (err) {
        setError(err.message || "Failed to load feedback.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const handleClose = async () => {
    try {
      await getSortedFeedbackTable();
      setSelectedFeedback(null);
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  // Prevent scrolling behind modal when modal is open
  if (selectedFeedback) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div className="adminClassContainer">
      <h1>Edit Feedback</h1>
      {loadingFeedback && <LoadingSpinner />}
      {feedbackError && <h3>{feedbackError}</h3>}
      {!loadingFeedback && allFeedback.length === 0 && (
        <h3>No feedback found</h3>
      )}

      {!loadingFeedback && allFeedback.length > 0 && (
        <table className="adminTable">
          <thead>
            <tr>
              <th className="colUserEmail">Email</th>
              <th className="colUserPhone">Phone</th>
              <th className="colRating">Rating</th>
              <th className="colComment">Comment</th>
              <th className="colFeedbackDate">Created at</th>
              <th className="colEdit"></th>
            </tr>
          </thead>
          <tbody>
            {allFeedback.map((feedback, index) => (
              <tr
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFeedback(feedback);
                }}
              >
                <td className="colUserEmail">{feedback.user.email}</td>
                <td className="colUserPhone">{feedback.user.phone}</td>
                <td className="colRating">{feedback.rating}</td>
                <td className="colComment">{feedback.comment}</td>
                <td className="colFeedbackDate">
                  {formatDateTime(feedback.createdAt)}
                </td>
                <td className="colEdit">
                  <ButtonSmall
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFeedback(feedback);
                    }}
                  >
                    View
                  </ButtonSmall>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedFeedback && (
        <AdminFeedbackModal feedback={selectedFeedback} onClose={handleClose} />
      )}
    </div>
  );
};
