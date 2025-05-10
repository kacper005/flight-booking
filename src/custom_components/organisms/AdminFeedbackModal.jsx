import React from "react";
import { Button } from "@atoms/Button";
import { showToast } from "@atoms/Toast/Toast.jsx";
import "@organisms/AdminFlightsModal/AdminFlightsModal.css";
import { deleteFeedback } from "@api/feedbackApi.js";
import { formatDateTime } from "@formatters/DateFormatters.js";

export const AdminFeedbackModal = ({ feedback, onClose }) => {
  const [formData, setFormData] = React.useState({ ...feedback });

  React.useEffect(() => {
    setFormData({ ...feedback });
  }, [feedback]);

  const handleDelete = async (e) => {
    e.preventDefault();

    const userConfirmed = window.confirm(
      "Are you sure you want to delete this feedback?",
    );
    if (userConfirmed) {
      try {
        await deleteFeedback(feedback.feedbackId);
        showToast({
          message: "Feedback deleted successfully",
          type: "success",
        });
        onClose();
      } catch (error) {
        console.error("Error deleting feedback:", error);
        showToast({
          message: "Failed to delete feedback",
          type: "error",
        });
      }
    }
  };

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <h2>Feedback Details</h2>
        <div className="modalGrid">
          <div className="formField">
            <label>Email</label>
            <input name={"email"} value={formData.user.email} disabled={true} />
          </div>
          <div className="formField">
            <label>Phone</label>
            <input name={"phone"} value={formData.user.phone} disabled={true} />
          </div>
          <div className="formField">
            <label>Rating</label>
            <input name={"rating"} value={formData.rating} disabled={true} />
          </div>
          <div className="formField">
            <label>Created at</label>
            <input
              name={"createdAt"}
              value={formatDateTime(formData.createdAt)}
              disabled={true}
            />
          </div>
          <div className="formField">
            <label>Comment</label>
            <textarea
              name={"comment"}
              value={formData.comment}
              disabled={true}
            />
          </div>
        </div>
        <div className="modalActions">
          <Button onClick={onClose}>Cancel</Button>
          <Button
            bgColor={"var(--buttonColorRed)"}
            hoverBgColor={"var(--buttonColorRedHover)"}
            width={"101px"}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
