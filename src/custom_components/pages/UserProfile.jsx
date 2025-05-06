import React from "react";
import { PageTemplate } from "@templates/PageTemplate/PageTempate";
import { useAuth } from "@context/AuthContext";
import { updateOwnProfile } from "@api/userApi.js";
import { showToast } from "@atoms/Toast/Toast.jsx";
import { Button } from "@atoms/Button";
import { allCountries } from "country-telephone-data";
import "./UserProfile.css";

export const UserProfile = () => {
    const { user } = useAuth();

    const [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        country: "",
        dateOfBirth: null,
        gender: null,
    });

    const [errors, setErrors] = React.useState({});

    React.useEffect(() => {
        if (user) {
            const matchedCountry = allCountries.find(
                (c) => c.name.toLowerCase() === (user.country || "").toLowerCase()
            );
            setFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                phone: user.phone || "",
                email: user.email || "",
                password: "",
                country: matchedCountry ? matchedCountry.name : "",
                dateOfBirth: user.dateOfBirth || null,
                gender: user.gender || null,
            });
        }
    }, [user]);

    const validate = () => {
        let newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
        if (!formData.email.includes("@")) newErrors.email = "Valid email required";
        if (formData.password && formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        if (formData.phone.length < 7) newErrors.phone = "Phone number must be at least 7 characters";
        if (!formData.phone.match(/^\+?[0-9]+$/)) newErrors.phone = "Phone number must be a number";
        if (!formData.country) newErrors.country = "Please select your country";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const token = localStorage.getItem("token");
        const updatedUser = { ...formData };
        if (!formData.password.trim()) delete updatedUser.password;

        try {
            await updateOwnProfile(updatedUser, token);
            showToast({ message: "Profile updated successfully!", type: "success" });
        } catch (error) {
            const message = typeof error.response?.data === "string"
                ? error.response.data
                : error.response?.data?.message || "Something went wrong";
            showToast({ message: `Failed to update profile. ${message}`, type: "error" });
            console.error("Profile update error:", error);
        }
    };

    return (
        <PageTemplate>
            <div className="profile-container">
                <h1 className="welcome">Welcome {user.firstName}</h1>
                <h2 className="subtitle">Your Profile</h2>
                <form className="profile-form" onSubmit={handleSave}>
                    <div className="row">
                        <div className="field">
                            <label>First Name</label>
                            <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                            />
                            {errors.firstName && <small className="errors">{errors.firstName}</small>}
                        </div>
                        <div className="field">
                            <label>Last Name</label>
                            <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                            />
                            {errors.lastName && <small className="errors">{errors.lastName}</small>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="field">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                value={formData.phone}
                                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                            />
                            {errors.phone && <small className="errors">{errors.phone}</small>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="field">
                            <label>Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            />
                            {errors.email && <small className="errors">{errors.email}</small>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="field">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Change Password"
                                value={formData.password}
                                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            />
                            {errors.password && <small className="errors">{errors.password}</small>}
                        </div>
                    </div>

                    <div className="input-group">
                        <div className="field">
                            <label>Country</label>
                            <select
                                name="country"
                                value={formData.country || ""}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    country: e.target.value
                                }))}
                            >
                                <option value="" disabled>Select your country</option>
                                {allCountries.map(({iso2, name}) => (
                                    <option key={iso2} value={name}>{name}</option>
                                ))}
                            </select>
                            {errors.country && <small className="errors">{errors.country}</small>}
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
