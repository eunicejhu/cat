import React from "react";
import useAuthUser from "./useAuthUser";
import { renderHook } from "@testing-library/react-hooks";
import Firebase, { FirebaseContext } from "../Firebase";

let mockOnAuthStateChanged = jest.fn().mockReturnValue(jest.fn());
jest.mock("../Firebase", () => ({
    __esModule: true,
    ...(jest.requireActual("../Firebase") as object),
    default: function () {
        return {
            auth: {
                onAuthStateChanged: mockOnAuthStateChanged,
            },
        };
    },
}));
it("useAuthUser", () => {
    const firebase = new Firebase();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <FirebaseContext.Provider value={firebase}>
            {children}
        </FirebaseContext.Provider>
    );
    renderHook(() => useAuthUser(), { wrapper });
    expect(mockOnAuthStateChanged).toHaveBeenCalledTimes(1);
});
