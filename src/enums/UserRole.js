const RoleDisplayMap = {
  ADMIN: "Admin",
  USER: "User",
};

export function getDisplayRole(role) {
  return RoleDisplayMap[role] || "Unknown";
}
