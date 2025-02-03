import React from "react";
import { Input } from "../atoms/Input";


export const Login = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Login Page</h1>
      <Input type={"username"} placeholder={"Username"}/>
      <Input type={"password"} placeholder={"Password"}/>
    </div>
  );
};
