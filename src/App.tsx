import React, { useEffect } from "react";
import NavBar from "./NavBar";
import Routes from "./Routes";
import styled from "styled-components";
import { Themes, Mode, useTheme } from "./components/Theme";
import Select from "./components/select/Select";
import { AuthUserContext, useAuthUser } from "./components/Session";

import { useDispatch } from "react-redux";
import { fetchUsers } from "./features/users/usersSlice";

const StyledApp = styled.div<{ themes: Themes; mode: Mode }>`
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

const App = () => {
    const dispatch = useDispatch();
    const authUser = useAuthUser();

    const { themes, mode, setMode } = useTheme();
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <AuthUserContext.Provider value={authUser}>
            <StyledApp themes={themes} mode={mode}>
                <header>
                    <NavBar />
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
        </AuthUserContext.Provider>
    );
};

export default App;
