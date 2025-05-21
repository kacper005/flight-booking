import React from "react";
import { useAuth } from "@hooks/useAuth";
import { Grid } from "@atoms/Grid";
import { RouteLink } from "@atoms/RouteLink";
import klarnaLogo from "@assets/logos/klarna.svg";
import visaLogo from "@assets/logos/visa-white-mark.svg";
import applePayLogo from "@assets/logos/applepay-mark.svg";
import githubLogo from "@assets/logos/github-mark-white.svg";
import googlePayLogo from "@assets/logos/googlepay-mark.svg";
import mastercardLogo from "@assets/logos/mastercard-mark.svg";

export const Footer = () => {
  const { isLoggedIn } = useAuth();

  return (
    <footer style={{ marginTop: "auto" }}>
      <nav
        style={{
          backgroundColor: "var(--mainColor)",
          color: "var(--textColor)",
          padding: "20px 40px",
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
          gap: "50px",
        }}
      >
        <Grid
          display={"grid"}
          alignItems={"center"}
          justifyContent={"center"}
          lineHeight={"1.5"}
        >
          <p style={{ fontWeight: "bold", marginBottom: "0px" }}>About us</p>
          <span style={{ marginTop: "10px" }} />
          <RouteLink to="/about-us" textDecoration="underline">
            About us
          </RouteLink>
          <RouteLink to="/important-information" textDecoration="underline">
            Important information
          </RouteLink>
          <RouteLink to="/sustainability" textDecoration="underline">
            Sustainability
          </RouteLink>
          <span style={{ marginBottom: "10px" }} />

          <a
            href="https://github.com/kacper005/flight-booking"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={githubLogo} alt="Github logo" width="50px" />
          </a>
        </Grid>
        <Grid
          display={"grid"}
          alignItems={"center"}
          justifyContent={"center"}
          lineHeight={"1.5"}
        >
          <p style={{ fontWeight: "bold", marginBottom: "0px" }}>Support</p>
          <span style={{ marginTop: "10px" }} />
          <RouteLink to="/contactus" textDecoration="underline">
            Contact us
          </RouteLink>
          <RouteLink to="/faq" textDecoration="underline">
            FAQ
          </RouteLink>
          <RouteLink to="/airline-information" textDecoration="underline">
            Airline information
          </RouteLink>
          <RouteLink to="/terms-and-conditions" textDecoration="underline">
            Terms and conditions
          </RouteLink>
        </Grid>
        <Grid
          display={"grid"}
          alignItems={"center"}
          justifyContent={"center"}
          lineHeight={"1.5"}
        >
          <p style={{ fontWeight: "bold", marginBottom: "0px" }}>
            {isLoggedIn ? `Profile` : `Log In`}
          </p>
          <span style={{ marginTop: "10px" }} />
          {!isLoggedIn && (
            <RouteLink to="/sign-in" textDecoration="underline">
              Log in
            </RouteLink>
          )}
          {!isLoggedIn && (
            <RouteLink to="/sign-up" textDecoration="underline">
              Register
            </RouteLink>
          )}
          {isLoggedIn && (
            <RouteLink to="/profile" textDecoration="underline">
              Profile
            </RouteLink>
          )}
          {isLoggedIn && (
            <RouteLink to="/saved-trips" textDecoration="underline">
              Saved trips
            </RouteLink>
          )}
        </Grid>
      </nav>

      <div
        style={{
          backgroundColor: "var(--mainColor)",
          color: "var(--white)",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <p
          style={{
            fontStyle: "italic",
            fontSize: "14px",
            color: "var(--textColor)",
            maxWidth: "650px",
            margin: "auto",
          }}
        >
          This website is a result of a university group project, performed in
          the course{" "}
          <a
            style={{ textDecoration: "underline", color: "var(--textColor)" }}
            href={"https://www.ntnu.edu/studies/courses/IDATA2301#tab=omEmnet"}
            target="_blank"
            rel="noopener noreferrer"
          >
            IDATA2301 Web technologies
          </a>
          , at{" "}
          <a
            style={{ textDecoration: "underline", color: "var(--textColor)" }}
            href={"https://www.ntnu.edu/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            NTNU
          </a>
          . All the information provided here is a result of imagination. Any
          resemblance with real companies or products is a coincidence.
        </p>
      </div>

      <div
        style={{
          backgroundColor: "var(--mainColor)",
          color: "var(--white)",
          textAlign: "center",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <img src={klarnaLogo} alt="Klarna Logo" width="100px" />
        <img src={visaLogo} alt="Visa logo" width="100px" />
        <img src={mastercardLogo} alt="Mastercard logo" width="75px" />
        <img src={applePayLogo} alt="Apple Pay logo" width="55px" />
        <img src={googlePayLogo} alt="Google Pay logo" width="68px" />
      </div>
    </footer>
  );
};
