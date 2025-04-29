import React from "react";
import { PageTemplate } from "@templates/PageTemplate/PageTempate";
import { Card } from "@atoms/Card/Card";
import { Button } from "@atoms/Button";
import { CircleCheckBig, LogIn } from "lucide-react";
import { RouteLink } from "@atoms/RouteLink";
import { signIn } from "@api/signInApi";
import { showToast } from "@atoms/Toast/Toast";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

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
    if (!formData.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await signIn({
        username: formData.email,
        password: formData.password,
      });

      const { jwt, user } = response.data;

      localStorage.setItem("token", jwt);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");

      showToast({ message: "Login Successful!", type: "success" });
      setFormData({ email: "", password: "" });
      navigate("/home");
    } catch (error) {
      const errMsg = error.response?.data || "Login failed. Please try again.";
      setErrors({ server: errMsg });
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
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              {errors.email && <small className="error">{errors.email}</small>}
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
              {errors.password && (
                <small className="error">{errors.password}</small>
              )}
              {errors.server && (
                <small className="error">{errors.server}</small>
              )}
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
