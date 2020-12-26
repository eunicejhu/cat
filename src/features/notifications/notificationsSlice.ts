import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    selectAllNotifications,
    selectNotificationsNextPage,
    selectNotificationsLimit,
} from "../../store/selectors";
import { State } from "../../store/types";
import Client from "../../api/client";

export interface Notification {
    id: string;
    date: string; // timestamp, ISO string
    userId: string;
    message: string;
}

export type NotificationsState = {
    nextPage: number;
    limit: number;
    items: Notification[];
};

const initialState: NotificationsState = {
    nextPage: 0,
    limit: 50,
    items: [],
};

export const fetchAll = createAsyncThunk(
    "notifications/fetchAll",
    async (_, { getState }) => {
        const notifications = selectAllNotifications(getState() as State);
        const latestTimestamp = notifications.slice().pop()?.date;
        const nextPage = selectNotificationsNextPage(getState() as State);
        const limit = selectNotificationsLimit(getState() as State);
        const queryParams = {
            timestamp: latestTimestamp,
            page: nextPage,
            limit,
        };
        let res;
        res = await Client.fetchAllNotifications<Notification>(queryParams);
        return res;
    }
);
const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAll.fulfilled, (state, action) => {
            state.items = action.payload.data.items;
            state.nextPage = action.payload.data.nextPage;
        });
    },
});

const { reducer } = notificationsSlice;

export default reducer;
