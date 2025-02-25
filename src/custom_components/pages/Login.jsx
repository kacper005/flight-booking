import React from "react";
import { Input } from "../atoms/Input/Input";
import { PageTemplate } from "../templates/PageTemplate/PageTempate";

export const Login = () => {
  return (
    <PageTemplate>
      <Input type={"username"} placeholder={"Username"} />
      <Input type={"password"} placeholder={"Password"} />
    </PageTemplate>
  );
};
