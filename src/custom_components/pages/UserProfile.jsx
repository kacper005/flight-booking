import React from "react";
import { PageTemplate } from "@templates/PageTemplate/PageTempate";
import { useAuth } from "@context/AuthContext";
import { updateOwnProfile } from "@api/userApi.js";
import { showToast } from "@atoms/Toast/Toast.jsx";
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

    // Populate fields from user when component loads
    React.useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                phone: user.phone || "",
                email: user.email || "",
                password: "",
                country: user.country || "",
                dateOfBirth: user.dateOfBirth || null,
                gender: user.gender || null,
            });
        }
    }, [user]);

    const handleSave = async () => {
        const token = localStorage.getItem("token");
        const updatedUser = { ...formData };

        // Remove password field if left blank
        if (!formData.password.trim()) {
            delete updatedUser.password;
        }

        try {
            await updateOwnProfile(updatedUser, token);
            showToast({ message: "Profile updated successfully!", type: "success" });
        } catch (error) {
            const message =
                typeof error.response?.data === "string"
                    ? error.response.data
                    : error.response?.data?.message || "Something went wrong";

            showToast({ message: `Failed to update profile. ${message}`, type: "error" });
            console.error("Profile update error:", error);
        }
    };

    return (
        <PageTemplate>
            <div className="profile-container">
                <h1 className="welcome">Welcome {formData.firstName}</h1>
                <h2 className="subtitle">Your Profile</h2>

                <form className="profile-form">
                    <div className="row">
                        <div className="field">
                            <label>First Name</label>
                            <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                            />
                        </div>
                        <div className="field">
                            <label>Last Name</label>
                            <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                            />
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
                        </div>
                    </div>

                    <div className="row">
                        <div className="field">
                            <label>Password</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="field">
                            <label>Country</label>
                            <input
                                type="text"
                                value={formData.country}
                                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                            />
                        </div>

                        <div className="button-container">
                            <button type="button" onClick={handleSave}>
                                SAVE
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </PageTemplate>
    );
};
