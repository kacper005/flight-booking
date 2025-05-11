import React from "react";
import { getNames } from "country-list";
import { allCountries } from "country-telephone-data";
import { createUser } from "@api/userApi.js";
import { Button } from "@atoms/Button.jsx";
import { showToast } from "@atoms/Toast/Toast.jsx";
import { BirthDatePicker } from "@atoms/DatePicker/BirthDatePicker.jsx";
import "@organisms/AdminFlightsModal/AdminFlightsModal.css";
import "./AdminUserModal.css";

export const AdminNewUserModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    phoneCode: "+47",
    phone: "",
    email: "",
    password: "",
    country: null,
    dateOfBirth: null,
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
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.length < 7) {
      newErrors.phone = "Phone number must be at least 7 characters";
    } else if (!formData.phone.match(/^\+?[0-9]+$/))
      newErrors.phone = "Phone number must be a number";
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

      if (age < 16) {
        newErrors.dateOfBirth = "You must be at least 16 years old to sign up";
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
        };

        await createUser(userPayload);
        onSave({ ...userPayload });
        showToast({
          message: "User created successfully!",
          type: "success",
        });
      } catch (error) {
        console.error(error);
        const message =
          typeof error.response?.data === "string"
            ? error.response.data
            : error.response?.data?.message ||
              "Something went wrong. Please try again.";

        showToast({
          message: `User creation failed. ${message}`,
          type: "error",
        });
      }
    }
  };

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="modalGrid">
            <div className="formField">
              <label>First Name</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <small className="adminError">{errors.firstName}</small>
              )}
            </div>
            <div className="formField">
              <label>Last Name</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <small className="adminError">{errors.lastName}</small>
              )}
            </div>
            <div className="formField">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
              {errors.email && (
                <small className="adminError">{errors.email}</small>
              )}
            </div>
            <div className="formField">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <small className="flightsError">{errors.password}</small>
              )}
            </div>
            <div className="formField formField-phone">
              <label>Mobile Number</label>
              <div className="phone-container-user-admin">
                <select
                  name="phoneCode"
                  value={formData.phoneCode}
                  onChange={handleChange}
                  className="phone-code-user-admin"
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
                  placeholder="Enter phone number"
                  className="phone-input-user-admin"
                  autoComplete="tel"
                />
              </div>
              {errors.phone && (
                <small className="adminError">{errors.phone}</small>
              )}
            </div>

            <div className="formField formField-country">
              <label>Country</label>
              <select
                name="country"
                value={formData.country || ""}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select your country
                </option>
                {getNames()
                  .sort((a, b) => a.localeCompare(b))
                  .map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
              </select>
              {errors.country && (
                <small className="adminError">{errors.country}</small>
              )}
            </div>
            <div className="formField">
              <label>Date of Birth</label>
              <BirthDatePicker
                formData={formData}
                setFormData={setFormData}
                errors={errors}
              />
              {errors.dateOfBirth && (
                <small className="adminError">{errors.dateOfBirth}</small>
              )}
            </div>
            <div className="formField" style={{ gridColumn: "1 / 3" }}>
              <label>Gender</label>
              <div className="gender-options-user-admin">
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
              {errors.gender && (
                <small className="adminError">{errors.gender}</small>
              )}
            </div>
          </div>
          <div className="modalActions">
            <Button type="submit">Add User</Button>
            <Button onClick={onClose}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
