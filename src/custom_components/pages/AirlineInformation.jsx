import React from "react";
import { PageTemplate } from "@templates/PageTemplate/PageTempate";
import { Card } from "@atoms/Card/Card";

export const AirlineInformation = () => {
  const airlines = [
    // Description just to show what text will look like. Replace with actual descriptions.
    {
      name: "Delta Air Lines",
      description:
        "Delta Air Lines is a major American airline, known for its extensive domestic and international routes.",
      images: [
        "/airlines/Delta/delta1.jpg",
        "/airlines/Delta/delta2.webp",
        "/airlines/Delta/delta3.avif",
      ],
    },
    {
      name: "Norwegian Air Shuttle",
      description:
        "Norwegian Air Shuttle is a low-cost airline from Norway, offering budget-friendly flights across Europe and beyond.",
      images: [
        "/airlines/Norwegian/norwegian1.jpg",
        "/airlines/Norwegian/norwegian2.jpg",
        "/airlines/Norwegian/norwegian3.jpg",
      ],
    },
    {
      name: "KLM Royal Dutch Airlines",
      description:
        "KLM is the flag carrier of the Netherlands, operating long-haul flights with a focus on sustainability.",
      images: ["/airlines/KLM/KLM1.jpg", "/airlines/KLM/klm2.webp"],
    },
    {
      name: "British Airways",
      description:
        "British Airways is one of the United Kingdom's leading airlines, providing premium travel experiences worldwide.",
      images: [
        "/airlines/British/british1.jpg",
        "/airlines/British/british2.webp",
        "/airlines/British/british3.jpg",
      ],
    },
    {
      name: "Swiss International Air Lines",
      description:
        "Swiss International Air Lines is Switzerland’s premium airline, known for its high-quality service and European routes.",
      images: [
        "/airlines/Swiss/swiss1.jpg",
        "/airlines/Swiss/swiss2.jpg",
        "/airlines/Swiss/swiss3.jpg",
        "/airlines/Swiss/swiss4.jpeg",
      ],
    },
    {
      name: "Alitalia",
      description:
        "Alitalia was Italy’s national airline, known for its Mediterranean routes and partnerships with international carriers.",
      images: [
        "/airlines/Alitalia/alitalia1.avif",
        "/airlines/Alitalia/alitalia2.webp",
        "/airlines/Alitalia/alitalia3.jpg",
      ],
    },
    {
      name: "American Airlines",
      description:
        "American Airlines is one of the largest airlines in the world, offering an extensive network across North and South America.",
      images: [
        "/airlines/American/american1.avif",
        "/airlines/American/american2.jpg",
        "/airlines/American/american3.webp",
      ],
    },
    {
      name: "Lufthansa",
      description:
        "Lufthansa is Germany’s largest airline, known for its excellent service and vast international flight network.",
      images: [
        "/airlines/Lufthansa/lufthansa1.jpg",
        "/airlines/Lufthansa/lufthansa2.webp",
        "/airlines/Lufthansa/lufthansa3.jpg",
        "/airlines/Lufthansa/lufthansa4.jpg",
      ],
    },
    {
      name: "Air France",
      description:
        "Air France is the flag carrier of France, providing flights across Europe, Africa, and the Americas.",
      images: [
        "/airlines/AirFrance/airfrance1.jpg",
        "/airlines/AirFrance/airfrance2.webp",
      ],
    },
    {
      name: "Emirates",
      description:
        "Emirates is a Dubai-based airline known for its luxurious services and extensive international reach.",
      images: [
        "/airlines/Emirates/emirates1.jpg",
        "/airlines/Emirates/emirates2.avif",
        "/airlines/Emirates/emirates3.jpg",
      ],
    },
    {
      name: "Qatar Airways",
      description:
        "Qatar Airways is a world-renowned airline based in Doha, known for its award-winning service and global connectivity.",
      images: [
        "/airlines/Qatar/qatar1.jpg",
        "/airlines/Qatar/qatar2.jpg",
        "/airlines/Qatar/qatar3.webp",
        "/airlines/Qatar/qatar4.webp",
      ],
    },
    {
      name: "Singapore Airlines",
      description:
        "Singapore Airlines is a top-rated carrier, offering exceptional service and long-haul travel options.",
      images: [
        "/airlines/Singapore/singapore1.jpg",
        "/airlines/Singapore/singapore2.png",
        "/airlines/Singapore/singapore3.jpg",
      ],
    },
  ];

  // State to track selected airline image index
  const [selectedAirlineIndex, setSelectedAirlineIndex] = React.useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  // Open image modal
  const openImageModal = (airlineIndex, imageIndex) => {
    setSelectedAirlineIndex(airlineIndex);
    setSelectedImageIndex(imageIndex);
  };

  // Close modal
  const closeImageModal = () => {
    setSelectedAirlineIndex(null);
    setSelectedImageIndex(0);
  };

  // Navigate images (left/right)
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

  // Handle keybord navigation
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
        <Card
          color={"#EDE8F5"}
          display="flex"
          flexDirection="column"
          alignItems="center"
          maxWidth="900px"
          style={{
            color: "#141619",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.15)",
          }}
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
            <div
              key={airlineIndex}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginBottom: "40px",
                padding: "24px",
                paddingBottom: "15px",
                borderRadius: "12px",
                borderBottom: "1px solid #ccc",
              }}
            >
              {/* Text Section */}
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

              {/* Image Section with clickable functionality */}
              <div
                style={{
                  flex: "1",
                  minWidth: "300px",
                  height: "200px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
                onClick={() => openImageModal(airlineIndex, 0)} // Open modal on first image
              >
                <img
                  src={airline.images[0]}
                  alt={airline.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "12px",
                    transition: "transform 0.3s ease",
                  }}
                />
              </div>
            </div>
          ))}

          {/* Image Modal with navigation*/}
          {selectedAirlineIndex !== null && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.8)", // Dark overlay
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
              }}
              onClick={closeImageModal} // Close modal on click
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
                {/* Left navigation arrow */}
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
                    width: "5%", // Clickable area width
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      fontSize: "40px",
                      color: "white",
                      userSelect: "none",
                    }}
                  >
                    {"<"}
                  </span>
                </div>

                {/* Right navigation arrow */}
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
                    width: "5%", // Clickable area width
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      fontSize: "40px",
                      color: "white",
                      userSelect: "none",
                    }}
                  >
                    {">"}
                  </span>
                </div>

                {/* Image Display */}
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

          {/* Footer */}
          <div
            style={{ marginTop: "30px", textAlign: "center", width: "100%" }}
          >
            <p style={{ fontSize: "14px", color: "#555" }}>
              © 2025 Flight Finder. All information provided here is for
              educational purposes.
            </p>
          </div>
        </Card>
      </div>
    </PageTemplate>
  );
};
