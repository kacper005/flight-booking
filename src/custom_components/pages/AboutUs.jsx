import React from "react";
import { PageTemplate } from "@templates/PageTemplate/PageTempate";
import { Card } from "@atoms/Card/Card";
import { Grid } from "@atoms/Grid";

export const AboutUs = () => {
  return (
    <PageTemplate>
      <Grid display={"flex"} alignItems={"center"} padding={"15px"}>
        <Card
          color="var(--textColor"
          display="flex"
          flexDirection="column"
          alignItems="center"
          maxWidth="900px"
          style={{
            color: "var(--textColorDark)",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
            backgroundColor: "var(textColor2)",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: "32px",
              fontWeight: "700",
              marginBottom: "30px",
            }}
          >
            About Us and Our Services
          </h1>

          {[
            `Welcome to Flight Finder, where your journey into the skies begins with the perfect flight option tailored to your needs. At Flight Finder, we’ve taken to the skies, transforming the flight booking experience by aggregating real-time prices and schedules from a plethora of trusted airline partners. No more endless tab-switching to hunt down the best deal—our platform brings all the information to you in a single, streamlined experience.`,

            `Our commitment goes beyond simply offering a vast array of flight options; we are dedicated to ensuring transparency, efficiency, and an exhilarating booking experience. Our user-friendly interface allows you to effortlessly compare flights, ensuring you find the perfect match for your travel preferences and budget. Farewell to the hidden fees and complex booking procedures—welcome to a smooth flight booking journey.`,

            `Flight Finder is not just about finding flights; it’s about commencing your travel adventure on the right note. Our platform is crafted to infuse a sense of excitement into the planning process. From last-minute getaways to well-planned business trips, we ensure you have all the choices at your fingertips. Our services are designed to bring you closer to the world, one flight at a time.`,

            `Join Flight Finder and elevate your travel planning to new heights. Whether you’re chasing the Northern Lights, jetting off to a tropical paradise, or heading to a bustling city for a conference, every flight booked with us is a promise of discovery and reliability. With Flight Finder, set off on every journey with confidence and let your travel aspirations take flight.`,
          ].map((paragraph, idx) => (
            <p
              key={idx}
              style={{
                textAlign: "justify",
                fontSize: "16px",
                lineHeight: "1.6",
                marginBottom: "20px",
                maxWidth: "800px",
              }}
            >
              {paragraph}
            </p>
          ))}

          <div
            style={{
              marginTop: "40px",
              textAlign: "center",
              fontSize: "14px",
              color: "var(--textColorDark)",
            }}
          >
            <p>
              © 2025 Flight Finder. All information provided here is for
              educational purposes.
            </p>
          </div>
        </Card>
      </Grid>
    </PageTemplate>
  );
};
