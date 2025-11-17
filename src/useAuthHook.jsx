import React, { useContext } from "react";
import { AuthContext } from "./Provider/AuthContext";

export default function useAuthHook() {
  const authInfo = useContext(AuthContext);
  return authInfo;
}
