import React from "react";
import { Input } from "../atoms/Input/Input";
import { PageTemplate } from "../templates/PageTemplate/PageTempate";
import { Card } from "../atoms/Card/Card";
import { Button } from "../atoms/Button";
import { CircleCheckBig } from "lucide-react";

export const Login = () => {
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
        <Card display="flex" flexDirection="column" alignItems="center">
          <h1 style={{ color: "var(--textColor)" }}>Sign In</h1>
          <Input type={"username"} placeholder={"Username"} />
          <Input type={"password"} placeholder={"Password"} />
          <div>
            <a href="#" style={{ color: "var(--colorText)" }}>
              Forgot your password?
            </a>
          </div>
        </Card>
        <Card
          display="flex"
          flexDirection="column"
          alignItems="center"
          maxWidth={"500px"}
          s
        >
          <h1 style={{ color: "var(--textColor)" }}>New to flight finder?</h1>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <p style={{ color: "var(--textColor)" }}>
              Get more benefits when you create a Flight Finder profile, and
              join our free loyality programme, Flight Finder Reward.
            </p>
            <p style={{ color: "var(--textColor)" }}>
              <CircleCheckBig color="var(--textColor)" />
              Earn points and save on future flights
            </p>
            <p style={{ color: "var(--textColor)" }}>
              <CircleCheckBig color="var(--textColor)" /> Make booking faster
            </p>
            <p style={{ color: "var(--textColor)" }}>
              <CircleCheckBig color="var(--textColor)" />
              Receive special deals and discounts
            </p>
          </div>
          <div>
            <Button>Create New Profile</Button>
          </div>
        </Card>
      </div>
      <div style={{ marginTop: "20px", color: "var(--textColor)" }}>
        <p>
          © 2025 Flight Finder ASA. Please note that this is a Flight Finder
          retail site, hence Flight Finder legislation and rules apply to any
          fees and/or charges.
        </p>
      </div>
    </PageTemplate>
  );
};
