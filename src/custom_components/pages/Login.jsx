import React from "react";
import { Input } from "../atoms/Input";
import { PageTemplate } from "../templates/PageTemplate/PageTempate";

export const Login = () => {
  return (
    <PageTemplate title="Login">
      <Input type={"username"} placeholder={"Username"} />
      <Input type={"password"} placeholder={"Password"} />
    </PageTemplate>
  );
};
