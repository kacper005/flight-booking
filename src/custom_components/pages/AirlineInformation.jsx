import React, {useState} from "react";
import { PageTemplate } from "../templates/PageTemplate/PageTempate";
import { Card } from "../atoms/Card/Card";

export const AirlineInformation = () => {
  const airlines = [
    // Description just to show what text will look like. Replace with actual descriptions.
    {
      name: "Delta Air Lines",
      description:
        "Delta Air Lines is a major American airline, known for its extensive domestic and international routes.",
      image: "/airlines/Delta/delta1.jpg",
    },
    {
      name: "Norwegian Air Shuttle",
      description:
        "Norwegian Air Shuttle is a low-cost airline from Norway, offering budget-friendly flights across Europe and beyond.",
      image: "/airlines/Norwegian/norwegian1.jpg",
    },
    {
      name: "KLM Royal Dutch Airlines",
      description:
        "KLM is the flag carrier of the Netherlands, operating long-haul flights with a focus on sustainability.",
      image: "/airlines/KLM/KLM1.jpg",
    },
    {
      name: "British Airways",
      description:
        "British Airways is one of the United Kingdom's leading airlines, providing premium travel experiences worldwide.",
      image: "/airlines/British/british1.jpg",
    },
    {
      name: "Swiss International Air Lines",
      description:
        "Swiss International Air Lines is Switzerland’s premium airline, known for its high-quality service and European routes.",
      image: "/airlines/Swiss/swiss1.jpg",
    },
    {
      name: "Alitalia",
      description:
        "Alitalia was Italy’s national airline, known for its Mediterranean routes and partnerships with international carriers.",
      image: "/airlines/Alitalia/alitalia1.avif",
    },
    {
      name: "American Airlines",
      description:
        "American Airlines is one of the largest airlines in the world, offering an extensive network across North and South America.",
      image: "/airlines/American/american1.avif",
    },
    {
      name: "Lufthansa",
      description:
        "Lufthansa is Germany’s largest airline, known for its excellent service and vast international flight network.",
      image: "/airlines/Lufthansa/lufthansa1.jpg",
    },
    {
      name: "Air France",
      description:
        "Air France is the flag carrier of France, providing flights across Europe, Africa, and the Americas.",
      image: "/airlines/AirFrance/airfrance1.jpg",
    },
    {
      name: "Emirates",
      description:
        "Emirates is a Dubai-based airline known for its luxurious services and extensive international reach.",
      image: "/airlines/Emirates/emirates1.jpg",
    },
    {
      name: "Qatar Airways",
      description:
        "Qatar Airways is a world-renowned airline based in Doha, known for its award-winning service and global connectivity.",
      image: "/airlines/Qatar/qatar1.jpg",
    },
    {
      name: "Singapore Airlines",
      description:
        "Singapore Airlines is a top-rated carrier, offering exceptional service and long-haul travel options.",
      image: "/airlines/Singapore/singapore1.jpg",
    },
  ];

  // State to track selected image and open/close state
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to open the modal
    const openImageModal = (index) => {
        setSelectedImage(index);
    };

    // Function to close the modal
    const closeImageModal = () => {
        setSelectedImage(null);
    };

    // Close modal on "Esc" key press
    React.useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "Escape") {
                closeImageModal();
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, []);

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
              marginBottom: "20px",
              fontSize: "28px",
            }}
          >
            Airline Information
          </h1>

          {airlines.map((airline, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginBottom: "30px",
                paddingBottom: "15px",
                borderBottom: "1px solid #ccc",
              }}
            >
              {/* Text Section */}
              <div
                style={{ flex: "1", minWidth: "300px", paddingRight: "20px" }}
              >
                <h2 style={{ fontSize: "22px", marginBottom: "10px" }}>
                  {airline.name}
                </h2>
                <p style={{ lineHeight: "1.5", textAlign: "justify" }}>
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
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  cursor: "pointer",
                }}
                onClick={() => openImageModal(airline.image)}
              >
                  <img
                    src={airline.image}
                    alt={airline.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </div>
            </div>
            ))}

          {/* Image Modal */}
          {selectedImage && (
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
                  <img
                    src={selectedImage}
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
