// selectors
import { State } from "./index";
import { Notification } from "../features/notifications/notificationsSlice";
import { Post } from "../features/posts/postsSlice";
import { User } from "../features/users/usersSlice";

export const selectAllPosts = (state: State): Post[] => state.posts.data;
export const selectPostById = (
    state: State,
    postId: string
): Post | undefined => state.posts.data.find((post) => post.id === postId);
export const selectAllNotifications = (state: State): Notification[] =>
    state.notifications.items;
export const selectNotificationsNextPage = (state: State): number =>
    state.notifications.nextPage;
export const selectNotificationsLimit = (state: State): number =>
    state.notifications.limit;
export const selectAllUsers = (state: State): User[] => state.users.data;
