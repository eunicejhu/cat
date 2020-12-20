import app from "firebase/app";
import "firebase/auth";
import FirebaseContext from "./context";
import useFirebase from "./useFirebase";

//TODO: .env.production, .env.development
const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
    auth: app.auth.Auth;
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.auth.useEmulator("http://localhost:9099/");
    }

    /**
     * Auth API
     */
    doCreateUserWithEmailAndPassword = (email: string, password: string) =>
        this.auth.createUserWithEmailAndPassword(email, password);
    doSignInWithEmailAndPassword = (email: string, password: string) =>
        this.auth.signInWithEmailAndPassword(email, password);
    doSignOut = () => this.auth.signOut();
    doPasswordReset = (email: string) =>
        this.auth.sendPasswordResetEmail(email);
    doPasswordUpdate = (newPassword: string) =>
        this.auth.currentUser?.updatePassword(newPassword);
}

export default Firebase;
export { FirebaseContext, useFirebase };
