import React from "react";
import { Route, Switch } from "react-router-dom";
import SinglePostPage from "./features/posts/SinglePostPage";
import PostsList from "./features/posts/PostsList";
import EditPostForm from "./features/posts/EditPostForm";
import NotificationsList from "./features/notifications/NotificationsList";

import * as ROUTES from "./constants/routes";
import SignUpPage from "./components/SignUp";

const NoMatch = () => <>No match</>;
const Routes = () => (
    <Switch>
        <Route exact path="/">
            <PostsList />
        </Route>
        <Route exact path="/posts/:id">
            <SinglePostPage />
        </Route>
        <Route exact path={ROUTES.SIGN_UP}>
            <SignUpPage />
        </Route>
        <Route exact path="/editPost/:id">
            <EditPostForm />
        </Route>
        <Route exact path="/notifications/">
            <NotificationsList />
        </Route>
        <Route>
            <NoMatch />
        </Route>
    </Switch>
);
export default Routes;
