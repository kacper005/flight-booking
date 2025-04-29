import React from "react";
import { PageTemplate } from "@templates/PageTemplate/PageTempate";
import { useAuth } from "@context/AuthContext";

export const UserProfile = () => {
  const { user } = useAuth();

  return (
    <PageTemplate>
      <div className="user-profile">
        <h1>Welcome {user?.firstName}</h1>
        <h2>Your Profile</h2>
        <div className="profile-details">
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>First Name:</strong> {user?.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {user?.lastName}
          </p>
          <p>
            <strong>Phone Number:</strong> {user?.phone}
          </p>
          <p>
            <strong>Date of Birth:</strong> {user?.dateOfBirth}
          </p>
          <p>
            <strong>Country:</strong> {user?.country}
          </p>
          {user?.role === "ADMIN" && (
            <p>
              <strong>Role:</strong> {user?.role}
            </p>
          )}
        </div>
      </div>
    </PageTemplate>
  );
};
