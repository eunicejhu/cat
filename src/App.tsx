import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Routes from "./Routes";
import styled from "styled-components";
import { Mode, Themes, SetMode } from "./components/Theme";
import Select from "./components/select/Select";
import app from "firebase/app";

import { useDispatch } from "react-redux";
import { fetchUsers } from "./features/users/usersSlice";
import Firebase, { useFirebase } from "./components/Firebase";

export interface AppProps {
    themes: Themes;
    mode: Mode;
    setMode: SetMode;
}

const StyledApp = styled.div<AppProps>`
    ${({ themes, mode }) => {
        return `
            color: ${themes[mode].text};
            background-color: ${themes[mode].background};
      
        & input, & textarea {
            border: 1px solid  ${themes[mode].btnBorder};
            padding:  ${themes[mode].spacing};
            box-sizing: border-box;
        }

        & header {
            display: flex;
            align-items: center;
            justify-content: flex-end;

            nav {
                display: flex;
                align-items: center;
                li {
                    margin: 0 ${themes[mode].spacing};
                    list-style: none;
                }
            }

            .selectWrapper {
                width: 4em;
                margin: 0 ${themes[mode].spacing};
            }
        }
        `;
    }}
    : var(--color-text);
`;

const modeData = (data: string[]) =>
    data.map((mode: string) => ({ id: mode, name: mode }));

export const useAuthUser = () => {
    const [authUser, setAuthUser] = useState<app.User | null>(null);
    const firebase = useFirebase() as Firebase;
    useEffect(() => {
        // unsubscribe is reported to be "not a function" weird!
        firebase.auth.onAuthStateChanged((authUser) => setAuthUser(authUser));
    }, [firebase]);

    return authUser;
};

const App: React.FC<AppProps> = (props) => {
    const dispatch = useDispatch();
    const authUser = useAuthUser();

    const { themes, mode, setMode } = props;
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <StyledApp {...props} themes={themes} mode={mode}>
            <header>
                <NavBar authUser={authUser} />
                <div className="selectWrapper">
                    <Select
                        themes={themes}
                        mode={mode}
                        value={mode}
                        name="theme"
                        data={modeData(["dark", "pink", "light"])}
                        placeholder="theme"
                        onChange={setMode}
                    ></Select>
                </div>
            </header>
            <main>
                <Routes />
            </main>
            <footer>copyright@2020 author ZUOQIN HU</footer>
        </StyledApp>
    );
};

export default App;
