import React from "react";

import "@organisms/AdminFlightsModal/AdminFlightsModal.css";
import PropTypes from "prop-types";
import {showToast} from "@atoms/Toast/Toast.jsx";
import {Button} from "@atoms/Button.jsx";

export const AdminUsersModal = ({users, onClose, onSave}) => {
    const [formData, setFormData] = React.useState({...users});

    React.useEffect(() => {
        setFormData({...users});
    }, [users]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                                required
                            />
                        </div>
                        <div className="formField">
                            <label>Last Name</label>
                            <input
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="formField">
                            <label>Email</label>
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="formField">
                            <label>Phone</label>
                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="formField">
                            <label>Country</label>
                            <input
                                name="country"
                                value={formData.country || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="formField">
                            <label>Role</label>
                            <select name="role" value={formData.role} onChange={handleChange}>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
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
};

AdminUsersModal.propTypes = {
    users: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};