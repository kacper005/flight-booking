import React from "react";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import FeedbackCard from "@atoms/FeedbackCard/FeedbackCard.jsx";
import { LoadingSpinner } from "@atoms/LoadingSpinner";
import { getFeedback } from "@api/feedbackApi.js";
import { formatDate } from "@formatters/DateFormatters.js";
import "./Feedback.css";

export const Feedback = () => {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [itemWidth, setItemWidth] = React.useState(getItemWidth());
  const containerRef = React.useRef();
  const [allFeedback, setAllFeedback] = React.useState([]);
  const [loadingFeedback, setLoading] = React.useState(true);
  const [feedbackError, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await getFeedback();
        const sorted = res.data.sort((a, b) =>
          b.createdAt.localeCompare(a.createdAt)
        );
        setAllFeedback(sorted);
      } catch (err) {
        setError(err.message || "Failed to load feedback.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  // Function to determine ITEM_WIDTH dynamically
  function getItemWidth() {
    return window.innerWidth <= 520 ? 295 : 425;
  }

  // Update itemWidth when the window is resized
  React.useEffect(() => {
    const handleResize = () => setItemWidth(getItemWidth());
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to handle scrolling when the button is clicked
  const handleScroll = (scrollAmount) => {
    // Calculate the new scroll position
    const newScrollPosition = scrollPosition + scrollAmount;

    // Update the state with the new scroll position
    setScrollPosition(newScrollPosition);

    // Access the container element and set its scroll property
    containerRef.current.scrollLeft = newScrollPosition;
  };

  return (
    <section className={"feedback"}>
      <h1>Feedback</h1>
      <div className={"container"}>
        <div
          ref={containerRef}
          style={{
            width: "100%",
            overflowX: "scroll",
            scrollBehavior: "smooth",
            marginRight: "65px",
          }}
        >
          <div className={"feedbackCardContainer"}>
            {loadingFeedback && (
              <div className={"feedbackSpinnerContainer"}>
                <LoadingSpinner />
              </div>
            )}
            {feedbackError && (
              <h3 className={"h3FeedbackError"}>{feedbackError}</h3>
            )}
            {!loadingFeedback && allFeedback.length === 0 && (
              <h3 className={"h3FeedbackError"}>No feedback found</h3>
            )}

            {!loadingFeedback &&
              allFeedback.length > 0 &&
              allFeedback.map((feedback, index) => (
                <FeedbackCard
                  key={index}
                  name={feedback.user.firstName}
                  rating={feedback.rating}
                  feedback={feedback.comment}
                  date={formatDate(feedback.createdAt)}
                />
              ))}
          </div>
        </div>

        <button
          className={"leftButton"}
          aria-label={"Scroll left"}
          onClick={() => {
            handleScroll(-itemWidth);
          }}
        >
          <ChevronLeft size={"50"} />
        </button>
        <button
          className={"rightButton"}
          aria-label={"Scroll right"}
          onClick={() => {
            handleScroll(itemWidth);
          }}
        >
          <ChevronRight size={"50"} />
        </button>
      </div>
    </section>
  );
};
