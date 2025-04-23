import React from "react";
import "./SignUp.css";
import { RouteLink } from "@atoms/RouteLink";
import { Button } from "@atoms/Button";
import { createUser } from "@api/userApi";
import { showToast } from "@atoms/Toast/Toast";
import { BirthDatePicker } from "@atoms/DatePicker/BirthDatePicker";
import { allCountries } from "country-telephone-data";

export const SignUp = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    repeatPassword: "",
    phoneCode: "+1",
    phone: "",
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    country: null,
    gender: "",
  });

  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        gender: checked ? value : "",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Valid email required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.repeatPassword.length < 6)
      newErrors.repeatPassword = "Password must be at least 6 characters";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (formData.phone.length < 7)
      newErrors.phone = "Phone number must be at least 7 characters";
    if (!formData.phone.match(/^[0-9]+$/))
      newErrors.phone = "Phone number must be a number";
    if (formData.password !== formData.repeatPassword)
      newErrors.repeatPassword = "Passwords do not match";
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required";
    } else {
      const today = new Date();
      const birthDate = new Date(formData.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }

      if (age < 18) {
        newErrors.dateOfBirth = "You must be at least 18 years old to sign up";
      }
    }

    if (!formData.gender) newErrors.gender = "Please select your gender";
    if (!formData.country) newErrors.country = "Please select your country";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const userPayload = {
          email: formData.email,
          password: formData.password,
          phone: `${formData.phoneCode}${formData.phone}`,
          firstName: formData.firstName,
          lastName: formData.lastName,
          dateOfBirth: formData.dateOfBirth,
          country: formData.country,
          gender: formData.gender,
          role: "USER",
          createdAt: new Date().toLocaleString("en-GB"),
        };

        await createUser(userPayload);
        showToast({ message: "Signup Successful!", type: "success" });

        setFormData({
          email: "",
          password: "",
          repeatPassword: "",
          phoneCode: "+1",
          phone: "",
          firstName: "",
          lastName: "",
          dateOfBirth: null,
          country: "",
          gender: "",
        });
      } catch (error) {
        console.error(error);
        const message =
          typeof error.response?.data === "string"
            ? error.response.data
            : error.response?.data?.message ||
              "Something went wrong. Please try again.";

        showToast({ message: `Signup failed. ${message} `, type: "error" });
      }
    }
  };

  return (
    <div className="signup-container">
      <h2 style={{ color: "var(--textColor)" }}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <small className="error">{errors.email}</small>}
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
          />
          {errors.password && (
            <small className="error">{errors.password}</small>
          )}
        </div>

        <div className="input-group">
          <label>Repeat Password</label>
          <input
            type="password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
            placeholder="Repeat your password"
          />
          {errors.repeatPassword && (
            <small className="error">{errors.repeatPassword}</small>
          )}
        </div>

        <div className="input-group">
          <label>Mobile Number</label>
          <div className="phone-container">
            <select
              name="phoneCode"
              value={formData.phoneCode}
              onChange={handleChange}
              className="phone-code"
            >
              {allCountries.map(({ iso2, dialCode }) => (
                <option key={iso2} value={`+${dialCode}`}>
                  (+{dialCode}) {iso2.toUpperCase()}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              className="phone-input"
            />
          </div>
          {errors.phone && <small className="error">{errors.phone}</small>}
        </div>

        <div className="input-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <small className="error">{errors.firstName}</small>
          )}
        </div>

        <div className="input-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <small className="error">{errors.lastName}</small>
          )}
        </div>
        <div className="input-group">
          <label>Date of Birth</label>
          <BirthDatePicker
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
          {errors.dateOfBirth && (
            <small className="error">{errors.dateOfBirth}</small>
          )}
        </div>
        {/* TODO: Add other countries */}
        <div className="input-group">
          <label>Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            {allCountries.map(({ iso2, name }) => (
              <option key={iso2} value={name}>
                {name}
              </option>
            ))}
          </select>
          {errors.country && <small className="error">{errors.country}</small>}
        </div>

        <div className="input-group">
          <label>Gender</label>
          <div className="gender-options">
            <label>
              <input
                type="checkbox"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="checkbox"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              Female
            </label>
          </div>
          {errors.gender && <small className="error">{errors.gender}</small>}
        </div>

        <Button width={"100%"} type="submit" className="signup-btn">
          Sign Up
        </Button>
      </form>
      <div className="login-link">
        <RouteLink to="/sign-in" margin="none" float="none">
          Already have an account? Sign In
        </RouteLink>
      </div>
    </div>
  );
};
