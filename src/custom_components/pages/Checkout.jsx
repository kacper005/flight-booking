import React from "react";
import { PageTemplate } from "@templates/PageTemplate/PageTempate";
import { RouteLink } from "@atoms/RouteLink";
import checkout from "@assets/checkout.png";

export const Checkout = () => {
  return (
    <PageTemplate>
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h3>Thank you for booking with Flight Finder!</h3>
        <p>We wish you a safe trip, see you soon.</p>
        <img
          src={checkout}
          alt="Thank You"
          style={{
            width: "100%",
            maxWidth: "350px",
            marginTop: "50px",
            marginBottom: "20px",
          }}
        />
      </div>
      <RouteLink
        color={"var(--textColorDark)"}
        textDecoration={"underline"}
        to={"/"}
      >
        Give us your feedback
      </RouteLink>
    </PageTemplate>
  );
};
