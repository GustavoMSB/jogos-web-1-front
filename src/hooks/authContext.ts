import { createContext } from "react";
import type { IAuthContext } from "./authProvider";

export const AuthContext = createContext({} as IAuthContext);
