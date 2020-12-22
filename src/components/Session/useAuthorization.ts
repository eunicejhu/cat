import { useEffect, useContext } from "react";
import app from "firebase/app";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import AuthUserContext from "./context";

const CONDITION = (authUser: app.User | null) => !!authUser;
const useAuthorization = (condition = CONDITION) => {
    const history = useHistory();
    const authUser = useContext(AuthUserContext);
    useEffect(() => {
        if (!condition(authUser)) {
            history.push(ROUTES.SIGN_IN);
        }
    }, [authUser, condition, history]);

    return authUser;
};

export default useAuthorization;
