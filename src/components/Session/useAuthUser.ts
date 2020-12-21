import { useEffect, useState } from "react";
import app from "firebase/app";
import Firebase, { useFirebase } from "../Firebase";
const useAuthUser = () => {
    const [authUser, setAuthUser] = useState<app.User | null>(null);
    const firebase = useFirebase() as Firebase;
    useEffect(() => {
        // unsubscribe is reported to be "not a function" weird!
        firebase.auth.onAuthStateChanged((authUser) => setAuthUser(authUser));
    }, [firebase]);

    return authUser;
};

export default useAuthUser;
