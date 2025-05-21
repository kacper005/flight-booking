import React from "react";
import { Star } from "lucide-react";
import { createFeedback } from "@api/feedbackApi";
import { useAuth } from "@hooks/useAuth";
import { PageTemplate } from "@templates/PageTemplate/PageTempate";
import { Grid } from "@atoms/Grid";
import { Button } from "@atoms/Button";
import { RouteLink } from "@atoms/RouteLink";
import { showToast } from "@atoms/Toast/Toast";
import { LoadingSpinner } from "@atoms/LoadingSpinner";
import logo from "@assets/logo.svg";
import airplane from "@assets/airplane.png";
import "./Feedback.css";

export const Feedback = () => {
  const { user } = useAuth();
  const [rating, setRating] = React.useState(0);
  const [hovered, setHovered] = React.useState(0);
  const [feedback, setFeedback] = React.useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0 || feedback.trim() === "") {
      showToast({
        message: "Please provide a rating and feedback.",
        type: "warning",
      });
      return;
    }

    const payload = {
      comment: feedback,
      rating: rating,
      user: {
        userId: user.userId,
      },
    };

    setLoading(true);

    try {
      await createFeedback(payload);
      showToast({
        message: "Feedback submitted successfully!",
        type: "success",
      });
      setFeedback("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setLoading(false);
      setFeedbackSubmitted(true);
    }
  };

  return (
    <PageTemplate>
      <Grid
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        justifyContent={"center"}
      >
        {loading && <LoadingSpinner />}
        {!feedbackSubmitted ? (
          <div className="feedback-container">
            <h3 className="feedback-heading">
              Thank you for choosing Flight Finder, help us to improve and leave
              your feedback.
            </h3>
            <form onSubmit={handleSubmit} className="feedback-form">
              <div className="feedback-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`star-icon ${
                      hovered >= star || rating >= star ? "filled" : ""
                    }`}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setRating(star)}
                    size={32}
                  />
                ))}
              </div>

              <textarea
                className="feedback-textarea"
                placeholder={`Leave feedback for ${rating} star${
                  rating > 1 ? "s" : ""
                }...`}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />

              <Button type={"submit"}>Submit</Button>
            </form>
          </div>
        ) : (
          <>
            {!loading && (
              <>
                <div
                  style={{
                    backgroundColor: "var(--mainColor)",
                    width: "100%",
                    height: "100%",
                    maxWidth: "600px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem",
                    borderRadius: "1rem",
                  }}
                >
                  <h2
                    style={{ color: "var(--textColor)", textAlign: "center" }}
                  >
                    Thank you for helping us to improve!
                  </h2>
                  <img
                    src={airplane}
                    alt="Airplane"
                    style={{ width: "100%" }}
                  />
                  <img
                    src={logo}
                    alt="Flight Finder"
                    style={{ width: "100%" }}
                  />
                </div>
                <RouteLink
                  to={"/"}
                  color={"var(--textColorDark)"}
                  textDecoration={"underline"}
                  margin={"2rem 0"}
                  fontSize={"2rem"}
                >
                  Home
                </RouteLink>
              </>
            )}
          </>
        )}
      </Grid>
    </PageTemplate>
  );
};
