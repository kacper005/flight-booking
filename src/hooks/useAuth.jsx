import React from "react";
import { AuthContext } from "@context/AuthContext";

export const useAuth = () => React.useContext(AuthContext);
