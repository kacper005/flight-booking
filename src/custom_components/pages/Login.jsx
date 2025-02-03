import React from "react";


export const Login = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Login Page</h1>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
    </div>
  );
};
