import React from "react";
import { getUsers, updateUser } from "@api/userApi.js";
import { formatDateTime } from "@formatters/DateFormatters";
import { getDisplayRole } from "@enums/UserRole.js";
import { ButtonSmall } from "@atoms/ButtonSmall";
import { Button } from "@atoms/Button.jsx";
import { LoadingSpinner } from "@atoms/LoadingSpinner";
import { AdminUsersModal } from "@organisms/AdminUserModal/AdminUsersModal.jsx";
import { AdminNewUserModal } from "@organisms/AdminUserModal/AdminNewUserModal.jsx";
import "./AdminUsers.css";

export const AdminUsers = () => {
  const [users, setUsers] = React.useState([]);
  const [loading, setloading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [showAddUserModal, setShowAddUserModal] = React.useState(false);

  const getUserTable = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        await getUserTable();
      } catch (err) {
        setError(err.message || "Failed to load users.");
      } finally {
        setloading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSave = async (updatedUser) => {
    try {
      await updateUser(updatedUser.userId, updatedUser);
      await getUserTable();
      setSelectedUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user.");
    }
  };

  const handleClose = async () => {
    try {
      await getUserTable();
      setSelectedUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user.");
    }
  };

  const handleAddUser = async () => {
    try {
      toggleModal();
      await getUserTable();
    } catch (error) {
      console.error("Error adding user:", error);
      setError("Failed to add user.");
    }
  };

  const toggleModal = () => {
    setShowAddUserModal(!showAddUserModal);
  };

  // Prevent scrolling behind modal when modal is open
  if (selectedUser || showAddUserModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div className={"adminClassContainer"}>
      <h1>Edit Users</h1>
      <Button margin={"0 0 20px 0"} onClick={toggleModal}>
        Add New User
      </Button>
      {loading && <LoadingSpinner />}
      {error && <h3>{error}</h3>}
      {!loading && users.length === 0 && <h3>No users found</h3>}

      {!loading && users.length > 0 && (
        <table className={"adminTable"}>
          <thead>
            <tr>
              <th className={"colUserId"}>User ID</th>
              <th className={"colFirstName"}>First Name</th>
              <th className={"colLastName"}>Last Name</th>
              <th className={"colEmail"}>Email</th>
              <th className={"colPhone"}>Phone</th>
              <th className={"colCreatedAt"}>Created At</th>
              <th className={"colRole"}>Role</th>
              <th className={"colEdit-admin-user"}>Edit</th>
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
                <td className={"colFirstName"}>{users.firstName}</td>
                <td className={"colLastName"}>{users.lastName}</td>
                <td className={"colEmail"}>{users.email}</td>
                <td className={"colPhone"}>{users.phone}</td>
                <td className={"colCreatedAt"}>
                  {formatDateTime(users.createdAt)}
                </td>
                <td className={"colRole"}>{getDisplayRole(users.role)}</td>
                <td className={"colEdit-admin-user"}>
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
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
      {showAddUserModal && (
        <AdminNewUserModal
          addNewUser={toggleModal}
          onClose={toggleModal}
          onSave={handleAddUser}
        />
      )}
    </div>
  );
};
