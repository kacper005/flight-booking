import React from "react";

export const Footer = () => {
  return (
    <>
      <nav
        style={{
          backgroundColor: "#3D52A0",
          color: "white",
          padding: "20px 40px",
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
          gap: "50px",
        }}
      >
        <div
          style={{ display: "grid", alignItems: "center", lineHeight: "1.5" }}
        >
          <p style={{ fontWeight: "bold", marginBottom: "0px" }}>About us</p>
          <p style={{ textDecoration: "underline", marginTop: "10px" }}>
            About us <br />
            Important information <br />
            Sustainability
          </p>
          <a
            href={"https://github.com/kacper005/flight-booking"}
            target={"_blank"}
            rel={"noopener noreferrer"} /* Improves security */
          >
            <img
              src={"../src/assets/logos/github-mark-white.svg"}
              alt="Github logo"
              width={"50px"}
            />
          </a>
        </div>
        <div
          style={{ display: "grid", alignItems: "center", lineHeight: "1.5" }}
        >
          <p style={{ fontWeight: "bold", marginBottom: "0px" }}>Support</p>
          <p style={{ textDecoration: "underline", marginTop: "10px" }}>
            Contact us <br />
            FAQ <br />
            Airline information <br />
            Terms and conditions
          </p>
        </div>
        <div
          style={{ display: "grid", alignItems: "center", lineHeight: "1.5" }}
        >
          <p style={{ fontWeight: "bold", marginBottom: "0px" }}>Log in</p>
          <p style={{ textDecoration: "underline", marginTop: "10px" }}>
            Log in <br />
            Register <br />
            My bookings
          </p>
        </div>
      </nav>

      <div
        style={{
          backgroundColor: "#3D52A0",
          color: "white",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <p
          style={{
            fontStyle: "italic",
            fontSize: "14px",
            maxWidth: "650px",
            margin: "auto",
          }}
        >
          This website is a result of a university group project, performed in
          the course
          <span style={{ textDecoration: "underline" }}>
            {" "}
            IDATA2301 Web technologies
          </span>
          , at <span style={{ textDecoration: "underline" }}>NTNU</span>. All
          the information provided here is a result of imagination. Any
          resemblance with real companies or products is a coincidence.
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#3D52A0",
          color: "white",
          textAlign: "center",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        <img
          src={"../src/assets/logos/visa-white-mark.svg"}
          alt="Visa logo"
          width={"100px"}
        />
        <img
          src={"../src/assets/logos/mastercard-mark.svg"}
          alt="Mastercard logo"
          width={"75px"}
        />
        <img
          src={"../src/assets/logos/applepay-mark.svg"}
          alt="Apple Pay logo"
          width={"55px"}
        />
        <img
          src={"../src/assets/logos/googlepay-mark.svg"}
          alt="Google Pay logo"
          width={"68px"}
        />
      </div>
    </>
  );
};
