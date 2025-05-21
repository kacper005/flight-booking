import React from "react";
import { PageTemplate } from "@templates/PageTemplate/PageTempate";
import { Grid } from "@atoms/Grid";
import "./AirlineInformation.css";

export const AirlineInformation = () => {
  const airlines = [
    {
      name: "Delta Air Lines",
      description:
        "Delta Air Lines is a major American airline, known for its extensive domestic and international routes.",
      images: [
        "/airlines/Delta/delta1.webp",
        "/airlines/Delta/delta2.webp",
        "/airlines/Delta/delta3.webp",
      ],
    },
    {
      name: "Norwegian Air Shuttle",
      description:
        "Norwegian Air Shuttle is a low-cost airline from Norway, offering budget-friendly flights across Europe and beyond.",
      images: [
        "/airlines/Norwegian/norwegian1.webp",
        "/airlines/Norwegian/norwegian2.webp",
      ],
    },
    {
      name: "KLM Royal Dutch Airlines",
      description:
        "KLM is the flag carrier of the Netherlands, operating long-haul flights with a focus on sustainability.",
      images: ["/airlines/KLM/KLM1.webp", "/airlines/KLM/klm2.webp"],
    },
    {
      name: "British Airways",
      description:
        "British Airways is one of the United Kingdom's leading airlines, providing premium travel experiences worldwide.",
      images: [
        "/airlines/British/british1.webp",
        "/airlines/British/british2.webp",
        "/airlines/British/british3.1.webp",
      ],
    },
    {
      name: "Swiss International Air Lines",
      description:
        "Swiss International Air Lines is Switzerland’s premium airline, known for its high-quality service and European routes.",
      images: [
        "/airlines/Swiss/swiss1.webp",
        "/airlines/Swiss/swiss2.webp",
        "/airlines/Swiss/swiss4.webp",
      ],
    },
    {
      name: "ITA Airways",
      description:
        "ITA Airways is Italy's new national airline, offering a modern fleet and a focus on sustainability.",
      images: [
        "/airlines/Alitalia/ita1.webp",
        "/airlines/Alitalia/ita2.webp",
        "/airlines/Alitalia/ita3.webp",
      ],
    },
    {
      name: "American Airlines",
      description:
        "American Airlines is one of the largest airlines in the world, offering an extensive network across North and South America.",
      images: [
        "/airlines/American/american1-1.webp",
        "/airlines/American/american2.webp",
        "/airlines/American/american3.webp",
      ],
    },
    {
      name: "Lufthansa",
      description:
        "Lufthansa is Germany’s largest airline, known for its excellent service and vast international flight network.",
      images: [
        "/airlines/Lufthansa/lufthansa1.webp",
        "/airlines/Lufthansa/lufthansa2.webp",
        "/airlines/Lufthansa/lufthansa3.webp",
        "/airlines/Lufthansa/lufthansa4.webp",
      ],
    },
    {
      name: "Air France",
      description:
        "Air France is the flag carrier of France, providing flights across Europe, Africa, and the Americas.",
      images: [
        "/airlines/AirFrance/airfrance1-1.webp",
        "/airlines/AirFrance/airfrance2.webp",
      ],
    },
    {
      name: "Emirates",
      description:
        "Emirates is a Dubai-based airline known for its luxurious services and extensive international reach.",
      images: [
        "/airlines/Emirates/emirates1.webp",
        "/airlines/Emirates/emirates2.webp",
        "/airlines/Emirates/emirates3-1.webp",
      ],
    },
    {
      name: "Qatar Airways",
      description:
        "Qatar Airways is a world-renowned airline based in Doha, known for its award-winning service and global connectivity.",
      images: [
        "/airlines/Qatar/qatar1.webp",
        "/airlines/Qatar/qatar3.webp",
        "/airlines/Qatar/qatar2.webp",
      ],
    },
    {
      name: "Singapore Airlines",
      description:
        "Singapore Airlines is a top-rated carrier, offering exceptional service and long-haul travel options.",
      images: [
        "/airlines/Singapore/singapore1.webp",
        "/airlines/Singapore/singapore2.webp",
        "/airlines/Singapore/singapore3-1.webp",
      ],
    },
  ];

  const [selectedAirlineIndex, setSelectedAirlineIndex] = React.useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  const openImageModal = (airlineIndex, imageIndex) => {
    setSelectedAirlineIndex(airlineIndex);
    setSelectedImageIndex(imageIndex);
  };

  const closeImageModal = () => {
    setSelectedAirlineIndex(null);
    setSelectedImageIndex(0);
  };

  const handleNextImage = () => {
    if (selectedAirlineIndex !== null) {
      setSelectedImageIndex(
        (prevIndex) =>
          (prevIndex + 1) % airlines[selectedAirlineIndex].images.length
      );
    }
  };

  const handlePrevImage = () => {
    if (selectedAirlineIndex !== null) {
      setSelectedImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + airlines[selectedAirlineIndex].images.length) %
          airlines[selectedAirlineIndex].images.length
      );
    }
  };

  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") closeImageModal();
      if (e.key === "ArrowRight") handleNextImage();
      if (e.key === "ArrowLeft") handlePrevImage();
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedAirlineIndex, selectedImageIndex]);

  return (
    <PageTemplate>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "40px 20px",
        }}
      >
        <Grid
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
          maxWidth={"900px"}
        >
          <h1
            style={{
              textAlign: "center",
              marginBottom: "30px",
              fontSize: "32px",
              fontWeight: "700",
            }}
          >
            Airline Information
          </h1>

          {airlines.map((airline, airlineIndex) => (
            <div className="airline-box" key={airlineIndex}>
              <div
                style={{ flex: "1", minWidth: "300px", paddingRight: "20px" }}
              >
                <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
                  {airline.name}
                </h2>
                <p
                  style={{
                    lineHeight: "1.6",
                    fontSize: "16px",
                    textAlign: "justify",
                  }}
                >
                  {airline.description}
                </p>
              </div>

              <div
                className=".clickable-image-container"
                onClick={() => openImageModal(airlineIndex, 0)}
              >
                <img
                  src={airline.images[0]}
                  alt={airline.name}
                  className="clickable-image"
                />
              </div>
            </div>
          ))}

          {selectedAirlineIndex !== null && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
              }}
              onClick={closeImageModal}
            >
              <div
                style={{
                  position: "relative",
                  width: "80%",
                  height: "80%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: "5%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      fontSize: "40px",
                      color: "var(--white)",
                      userSelect: "none",
                    }}
                  >
                    {"<"}
                  </span>
                </div>

                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    height: "100%",
                    width: "5%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      fontSize: "40px",
                      color: "var(--white)",
                      userSelect: "none",
                    }}
                  >
                    {">"}
                  </span>
                </div>

                <img
                  src={
                    airlines[selectedAirlineIndex].images[selectedImageIndex]
                  }
                  alt="Enlarged airline image"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              </div>
            </div>
          )}

          <div
            style={{ marginTop: "30px", textAlign: "center", width: "100%" }}
          >
            <p style={{ fontSize: "14px", color: "var(--textColorDark)" }}>
              © 2025 Flight Finder. All information provided here is for
              educational purposes.
            </p>
          </div>
        </Grid>
      </div>
    </PageTemplate>
  );
};
