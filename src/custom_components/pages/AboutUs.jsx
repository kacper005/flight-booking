import React from "react";
import { PageTemplate } from "@templates/PageTemplate/PageTempate";
import { Card } from "@atoms/Card/Card";

export const AboutUs = () => {
  return (
    <PageTemplate>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
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
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          <h1 style={{ textAlign: "center" }}>About us and our services</h1>
          <p style={{ textAlign: "justify", maxWidth: "800px" }}>
            Welcome to Flight Finder, where your journey into the skies begins
            with the perfect flight option tailored to your needs. At Flight
            Finder, we’ve taken to the skies, transforming the flight booking
            experience by aggregating real-time prices and schedules from a
            plethora of trusted airline partners. No more endless tab-switching
            to hunt down the best deal—our platform brings all the information
            to you in a single, streamlined experience.
          </p>

          <p style={{ textAlign: "justify", maxWidth: "800px" }}>
            Our commitment goes beyond simply offering a vast array of flight
            options; we are dedicated to ensuring transparency, efficiency, and
            an exhilarating booking experience. Our user-friendly interface
            allows you to effortlessly compare flights, ensuring you find the
            perfect match for your travel preferences and budget. Farewell to
            the hidden fees and complex booking procedures—welcome to a smooth
            flight booking journey.
          </p>

          <p style={{ textAlign: "justify", maxWidth: "800px" }}>
            Flight Finder is not just about finding flights; it’s about
            commencing your travel adventure on the right note. Our platform is
            crafted to infuse a sense of excitement into the planning process.
            From last-minute getaways to well-planned business trips, we ensure
            you have all the choices at your fingertips. Our services are
            designed to bring you closer to the world, one flight at a time.
          </p>

          <p style={{ textAlign: "justify", maxWidth: "800px" }}>
            Join Flight Finder and elevate your travel planning to new heights.
            Whether you’re chasing the Northern Lights, jetting off to a
            tropical paradise, or heading to a bustling city for a conference,
            every flight booked with us is a promise of discovery and
            reliability. With Flight Finder, set off on every journey with
            confidence and let your travel aspirations take flight.
          </p>

          {/* Footer Text Inside the Card */}
          <div
            style={{ marginTop: "20px", textAlign: "center", color: "#141619" }}
          >
            <p>
              © 2025 Flight Finder. All information provided here is for
              educational purposes.
            </p>
          </div>
        </Card>
      </div>
    </PageTemplate>
  );
};
