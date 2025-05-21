import React from "react";
import { PageTemplate } from "@templates/PageTemplate/PageTempate";
import { Grid } from "@atoms/Grid";

export const TermsAndConditions = () => {
  return (
    <PageTemplate>
      <Grid
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        gap={"25px"}
      >
        <h1 style={{ textAlign: "center" }}>Terms and Conditions</h1>

        <p style={{ textAlign: "justify", maxWidth: "700px" }}>
          Welcome to Flight Finder. By using our website, you agree to comply
          with and be bound by the following terms and conditions. Please read
          them carefully before using our services.
        </p>

        <h2 style={{ textAlign: "center", marginTop: "20px" }}>
          1. Use of Our Services
        </h2>
        <p style={{ textAlign: "justify", maxWidth: "700px" }}>
          Flight Finder is a flight price aggregator that provides users with a
          comparison of available flights from third-party airline booking
          sites. We do not sell tickets directly but serve as an intermediary to
          help users find the best available options.
        </p>

        <h2 style={{ textAlign: "center", marginTop: "20px" }}>
          2. Accuracy of Information
        </h2>
        <p style={{ textAlign: "justify", maxWidth: "700px" }}>
          We strive to provide accurate and up-to-date flight details. However,
          we do not guarantee the accuracy of prices, availability, or airline
          policies. Users should verify all details directly with the airline or
          booking provider before making a purchase.
        </p>

        <h2 style={{ textAlign: "center", marginTop: "20px" }}>
          3. User Responsibilities
        </h2>
        <p style={{ textAlign: "justify", maxWidth: "700px" }}>
          Users agree to use our platform lawfully and ethically. Any misuse of
          our website, such as providing false information, attempting to
          manipulate pricing, or unauthorized use of our services, is strictly
          prohibited.
        </p>

        <h2 style={{ textAlign: "center", marginTop: "20px" }}>
          4. Third-Party Links
        </h2>
        <p style={{ textAlign: "justify", maxWidth: "700px" }}>
          Our website contains links to third-party websites for booking
          flights. We are not responsible for the content, privacy policies, or
          transactions conducted on these third-party platforms.
        </p>

        <h2 style={{ textAlign: "center", marginTop: "20px" }}>
          5. Cancellations and Refunds
        </h2>
        <p style={{ textAlign: "justify", maxWidth: "700px" }}>
          As a flight price aggregator, we do not process flight bookings,
          cancellations, or refunds. All cancellation and refund policies are
          governed by the airline or booking provider you purchase from.
        </p>

        <h2 style={{ textAlign: "center", marginTop: "20px" }}>
          6. Limitation of Liability
        </h2>
        <p style={{ textAlign: "justify", maxWidth: "700px" }}>
          Flight Finder is not responsible for any loss, damages, or
          inconvenience arising from inaccurate flight information, technical
          issues, or decisions made based on information provided on our
          platform.
        </p>

        <h2 style={{ textAlign: "center", marginTop: "20px" }}>
          7. Privacy Policy
        </h2>
        <p style={{ textAlign: "justify", maxWidth: "700px" }}>
          We respect user privacy and handle data according to our Privacy
          Policy. By using our services, you agree to the collection and use of
          your data as outlined in our Privacy Policy.
        </p>

        <h2 style={{ textAlign: "center", marginTop: "20px" }}>
          8. Changes to Terms
        </h2>
        <p style={{ textAlign: "justify", maxWidth: "700px" }}>
          Flight Finder reserves the right to update these Terms and Conditions
          at any time. Users are responsible for reviewing them periodically to
          stay informed about any changes.
        </p>

        <h2 style={{ textAlign: "center", marginTop: "20px" }}>
          9. Contact Information
        </h2>
        <p style={{ textAlign: "justify", maxWidth: "700px" }}>
          If you have any questions about these terms, please contact us through
          our support page.
        </p>

        <br />
        <p style={{ textAlign: "justify", maxWidth: "700px" }}>
          © 2025 Flight Finder. All information provided here is for educational
          purposes.
        </p>
      </Grid>
    </PageTemplate>
  );
};
