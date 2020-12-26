import { fetchAll } from "./notificationsSlice";
import store from "../../store/index";
import Client from "../../api/client";
import { NOTIFICATIONS } from "../../test/mock_data";
jest.mock("../../api/client.ts");

describe("notifications fetchAll test", () => {
    test("succeeded", async () => {
        Client.fetchAllNotifications = jest
            .fn()
            .mockResolvedValue({ data: { items: NOTIFICATIONS, nextPage: 1 } });
        await store.dispatch(fetchAll());
        expect(store.getState().notifications.items).toEqual(NOTIFICATIONS);
        expect(store.getState().notifications.nextPage).toEqual(1);
    });
});
