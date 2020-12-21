import { createContext } from "react";
import app from "firebase/app";

const AuthUserContext = createContext<app.User | null>(null);

export default AuthUserContext;
