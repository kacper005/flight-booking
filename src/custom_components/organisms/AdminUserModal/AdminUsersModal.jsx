import React from "react";

import "./AdminUserModal.css";
import PropTypes from "prop-types";
import {showToast} from "@atoms/Toast/Toast.jsx";
import {Button} from "@atoms/Button.jsx";
import {getDisplayRole} from "@/enums/UserRole.js";
import {allCountries} from "country-telephone-data";
import {useAuth} from "@context/AuthContext.jsx";


export const AdminUsersModal = ({users, onClose, onSave}) => {
        const {user} = useAuth();
        const [formData, setFormData] = React.useState({...users});
        const [errors, setErrors] = React.useState({});

        const RoleDisplayMap = {
            ADMIN: "Admin",
            USER: "User",
        };


        React.useEffect(() => {
            const matchedCountry = allCountries.find(
                (c) => c.name.toLowerCase() === (user.country || "").toLowerCase()
            );
            setFormData({
                ...users, country: matchedCountry ? matchedCountry.name : "",
            });
        }, [users]);

        const handleChange = (e) => {
            const {name, value} = e.target;
            setFormData({...formData, [name]: value});
        }

        const validate = () => {
            let newErrors = {};

            if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
            if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
            if (!formData.email.includes("@")) newErrors.email = "Valid email required";
            if (formData.password && formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
            if (!formData.phone.trim()) {
                newErrors.phone = "Phone number is required";
            } else if (formData.phone.length < 7) {
                newErrors.phone = "Phone number must be at least 7 characters";
            } else if (!formData.phone.match(/^\+?[0-9]+$/)) newErrors.phone = "Phone number must be a number";

            if (!formData.country) newErrors.country = "Please select your country";

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (!validate()) return;
            try {
                onSave(formData);
                showToast({message: "User updated successfully!", type: "success"});
            } catch (error) {
                console.error("Error updating user:", error);
                const message =
                    typeof error.response?.data === "string"
                        ? error.response.data
                        : error.response?.data?.message || "Something went wrong. Please try again.";

                showToast({message: `Failed to update user. ${message}`, type: "error"});
            }
        };

        return (
            <div className="modalOverlay" onClick={onClose}>
                <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                    <h2>Edit User</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="modalGrid">
                            <div className="formField">
                                <label>First Name</label>
                                <input
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                {errors.firstName &&
                                    <small className="adminError">{errors.firstName}</small>}
                            </div>
                            <div className="formField">
                                <label>Last Name</label>
                                <input
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                                {errors.lastName &&
                                    <small className="adminError">{errors.lastName}</small>}
                            </div>
                            <div className="formField">
                                <label>Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <small className="adminError">{errors.email}</small>}
                            </div>
                            <div className="formField">
                                <label>Phone</label>
                                <input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                                {errors.phone && <small className="adminError">{errors.phone}</small>}
                            </div>
                            <div className="formField">
                                <label>Country</label>
                                <select
                                    name="country"
                                    value={formData.country || ""}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Select your country</option>
                                    {allCountries.map(({iso2, name}) => (
                                        <option key={iso2} value={name}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                                {errors.country &&
                                    <small className="adminError">{errors.country}</small>}
                            </div>

                            <div className="formField">
                                <label>Role</label>
                                <select name="role" value={formData.role} onChange={handleChange}>
                                    {Object.keys(RoleDisplayMap).map((key) => (
                                        <option key={key} value={key}>
                                            {getDisplayRole(key)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="modalActions">
                            <Button type="submit">Save</Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
;

AdminUsersModal.propTypes = {
    users: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};