import { useContext } from "react";
import FirebaseContext from "./context";

export default function useFirebase() {
    const firebase = useContext(FirebaseContext);
    return firebase;
}
