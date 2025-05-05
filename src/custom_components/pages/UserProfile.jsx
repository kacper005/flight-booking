import React, { useState, useEffect } from "react";
import { PageTemplate } from "@templates/PageTemplate/PageTempate";
import { useAuth } from "@context/AuthContext";
import { updateOwnProfile } from "@api/userApi.js";
import { showToast } from "@atoms/Toast/Toast.jsx";
import "./UserProfile.css";
import { Button } from "@atoms/Button";
import { allCountries } from "country-telephone-data";

export const UserProfile = () => {
  const { user } = useAuth();

  // Set up local state for editable fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [gender, setGender] = useState(null);

  // Populate fields from user when component loads
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhone(user.phone || "");
      setEmail(user.email || "");
      setPassword(""); // Always empty for security
      setCountry(user.country || "");

      // Store untouched values for sending back
      setDateOfBirth(user.dateOfBirth || null);
      setGender(user.gender || null);
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log("token", token);

    const updatedUser = {
      firstName,
      lastName,
      phone,
      email,
      country,
      dateOfBirth,
      gender,
    };

    if (password.trim()) {
      updatedUser.password = password;
    }

    try {
      await updateOwnProfile(updatedUser, token);
      showToast({ message: "Profile updated successfully!", type: "success" });
    } catch (error) {
      const message =
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message || "Something went wrong";

      showToast({
        message: `Failed to update profile. ${message}`,
        type: "error",
      });
      console.error("Profile update error:", error);
    }
  };

  return (
    <PageTemplate>
      <div className="profile-container">
        <h1 className="welcome">Welcome {firstName}</h1>
        <h2 className="subtitle">Your Profile</h2>

        <form className="profile-form" onSubmit={handleSave}>
          <div className="row">
            <div className="field">
              <label>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label>Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label>Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>
          <div className="button-container">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </PageTemplate>
  );
};
