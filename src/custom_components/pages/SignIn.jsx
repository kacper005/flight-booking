import React from "react";
import { Input } from "../atoms/Input/Input";
import { PageTemplate } from "../templates/PageTemplate/PageTempate";
import { Card } from "../atoms/Card/Card";
import { Button } from "../atoms/Button";
import { CircleCheckBig } from "lucide-react";
import { RouteLink } from "../atoms/RouteLink";

export const SignIn = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.email.includes("@")) newErrors.email = "Valid email required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Login Successful!");
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <PageTemplate>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "var(--mainColor)",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "500px",
            padding: "20px",
          }}
        >
          <h1 style={{ color: "var(--textColor)", marginBottom: "10px" }}>
            Sign In
          </h1>
          <form onSubmit={handleSubmit}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <Input type={"email"} placeholder={"Email"} />
              <Input type={"password"} placeholder={"Password"} />
              <Button width={"100%"} margin={"0px 0px 10px 0px"} type="submit">
                Sign In
              </Button>
            </div>
          </form>
          <div>
            <p>
              <a href="#" style={{ color: "var(--textColor)" }}>
                Forgot your password?
              </a>
            </p>
          </div>
        </div>
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
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <CircleCheckBig color="var(--textColor)" />
              <p style={{ color: "var(--textColor)" }}>
                Earn points and save on future flights
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <CircleCheckBig color="var(--textColor)" />
              <p style={{ color: "var(--textColor)" }}>Make booking faster</p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <CircleCheckBig color="var(--textColor)" />
              <p style={{ color: "var(--textColor)" }}>
                Receive special deals and discounts
              </p>
            </div>
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
