import React from "react";
import { PageTemplate } from "@templates/PageTemplate/PageTempate";
import { Card } from "@atoms/Card/Card";

export const ImportantInformation = () => {
  return (
    <PageTemplate>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <Card
          color={"#EDE8F5"}
          display="flex"
          flexDirection="column"
          alignItems="center"
          maxWidth="800px"
          style={{
            //backgroundColor: "#EDE8F5",
            color: "#141619",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          <h1>Important Information</h1>
          <p style={{ textAlign: "justify", maxWidth: "700px" }}>
            This website is a result of a university group project, performed in
            the course{" "}
            <a
              style={{ textDecoration: "underline" }}
              href={
                "https://www.ntnu.edu/studies/courses/IDATA2301#tab=omEmnet"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              IDATA2301 Web technologies
            </a>
            , at{" "}
            <a
              style={{ textDecoration: "underline" }}
              href={"https://www.ntnu.edu/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              NTNU
            </a>
            . All the information provided here is a result of imagination. Any
            resemblance with real companies or products is a coincidence.
          </p>

          <h2 style={{ margin: "0", paddingTop: "20px" }}>Disclaimer</h2>
          <p style={{ textAlign: "justify", maxWidth: "700px" }}>
            The information on this website is not verified for accuracy and
            should not be considered factual. This project is not affiliated
            with any real company or airline, or any official flight service
            provider. No real transactions, bookings, or services are provided
            through this website.
          </p>

          <h2 style={{ margin: "0", paddingTop: "20px" }}>
            Privacy and Data Collection
          </h2>
          <p style={{ textAlign: "justify", maxWidth: "700px" }}>
            This website does not collect, store, or share personal data. If any
            form submissions or cookies are used, they are solely for
            demonstration purposes within the course project.
          </p>

          <h2 style={{ margin: "0", paddingTop: "20px" }}>
            Use of Third-Party Assets
          </h2>
          <p style={{ textAlign: "justify", maxWidth: "700px" }}>
            Some images, icons, or external resources used on this website may
            be sourced from open-license platforms. All rights belong to their
            respective owners.
          </p>

          <br />
          <p style={{ textAlign: "justify", maxWidth: "700px" }}>
            © 2025 Flight Finder. All information provided here is for
            educational purposes.
          </p>
        </Card>
      </div>
    </PageTemplate>
  );
};
