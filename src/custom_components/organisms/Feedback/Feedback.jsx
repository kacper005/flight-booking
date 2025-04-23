import React from "react";
import "./Feedback.css";
import FeedbackCard from "@atoms/FeedbackCard/FeedbackCard.jsx";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";

export const Feedback = () => {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [itemWidth, setItemWidth] = React.useState(getItemWidth());
  const containerRef = React.useRef();

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
            <FeedbackCard
              name="User 1"
              rating={5}
              feedback="Feedback text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum sollicitudin augue, sed volutpat felis commodo in."
              date="01.01.2025"
            />
            <FeedbackCard
              name="User 2"
              rating={4}
              feedback="Feedback text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum sollicitudin augue, sed volutpat felis commodo in."
              date="02.02.2025"
            />
            <FeedbackCard
              name="User 3"
              rating={3}
              feedback="Feedback text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum sollicitudin augue, sed volutpat felis commodo in."
              date="03.03.2025"
            />
            <FeedbackCard
              name="User 4"
              rating={2}
              feedback="Feedback text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum sollicitudin augue, sed volutpat felis commodo in."
              date="04.04.2025"
            />
            <FeedbackCard
              name="User 5"
              rating={1}
              feedback="Feedback text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum sollicitudin augue, sed volutpat felis commodo in."
              date="05.05.2025"
            />
          </div>
        </div>

        <button
          className={"leftButton"}
          onClick={() => {
            handleScroll(-itemWidth);
          }}
        >
          <ChevronLeft size={"50"} />
        </button>
        <button
          className={"rightButton"}
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
