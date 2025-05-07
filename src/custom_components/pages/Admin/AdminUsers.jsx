import React from "react";

import "./AdminFlights.css";
import { ButtonSmall } from "../../atoms/ButtonSmall";
import { getUsers, updateUser } from "@api/userApi.js";
import { Button } from "@atoms/Button.jsx";
import LoadingSpinner from "@atoms/LoadingSpinner.jsx";
import { AdminUsersModal } from "@organisms/AdminUserModal/AdminUsersModal.jsx";

export const AdminUsers = () => {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [selectedUser, setSelectedUser] = React.useState(null);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        setUsers(res.data);
      } catch (err) {
        setError(err.message || "Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const formDateTime = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  };

  const handleSave = async (updatedUser) => {
    try {
      await updateUser(updatedUser.userId, updatedUser);
      const res = await getUsers();
      setUsers(res.data);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user.");
    }
  };

  return (
    <div className={"adminClassContainer"}>
      <h1>Edit Users</h1>
      <Button margin={"0 0 20px 0"}>Add User (WIP)</Button>
      {loading && <LoadingSpinner />}
      {error && <h3>{error}</h3>}
      {!loading && users.length === 0 && <h3>No users found</h3>}

      {!loading && users.length > 0 && (
        <table className={"adminTable"}>
          <thead>
            <tr>
              <th className={"colUserId"}>User ID</th>
              <th className={"colFirst Name"}>First Name</th>
              <th className={"colLast Name"}>Last Name</th>
              <th className={"colEmail"}>Email</th>
              <th className={"colPhone"}>Phone</th>
              <th className={"colCreated At"}>Created At</th>
              <th className={"colRole"}>Role</th>
              <th className={"colEdit"}>Edit</th>
            </tr>
          </thead>
          <tbody>
            {users.map((users, index) => (
              <tr
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedUser(users);
                }}
              >
                <td className={"colUserId"}>{users.userId}</td>
                <td className={"colFirst Name"}>{users.firstName}</td>
                <td className={"colLast Name"}>{users.lastName}</td>
                <td className={"colEmail"}>{users.email}</td>
                <td className={"colPhone"}>{users.phone}</td>
                <td className={"colCreated At"}>
                  {formDateTime(users.createdAt)}
                </td>
                <td className={"colRole"}>{users.role}</td>
                <td className={"colEdit"}>
                  <ButtonSmall
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedUser(users);
                    }}
                  >
                    Edit
                  </ButtonSmall>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedUser && (
        <AdminUsersModal
          users={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};
