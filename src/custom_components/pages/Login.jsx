import React from "react";
import { Input } from "../atoms/Input/Input";
import { PageTemplate } from "../templates/PageTemplate/PageTempate";
import { Card } from "../atoms/Card/Card";
import { Button } from "../atoms/Button";
import { CircleCheckBig } from "lucide-react";
import { RouteLink } from "../atoms/RouteLink";

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
        <Card
          display="flex"
          flexDirection="column"
          alignItems="center"
          maxWidth={"300px"}
        >
          <h1 style={{ color: "var(--textColor)" }}>Sign In</h1>
          <Input type={"email"} placeholder={"Username"} />
          <Input type={"password"} placeholder={"Password"} />
          <Button width={"100%"}>Sign In</Button>
          <div>
            <p>
              <a href="#" style={{ color: "var(--colorText)" }}>
                Forgot your password?
              </a>
            </p>
          </div>
        </Card>
        <Card
          display="flex"
          flexDirection="column"
          alignItems="center"
          maxWidth={"500px"}
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
            <RouteLink to="/sign-up">
              <Button>Create New Profile</Button>
            </RouteLink>
          </div>
        </Card>
      </div>
    </PageTemplate>
  );
};
