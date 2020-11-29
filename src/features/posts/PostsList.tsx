import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import AddPostForm from "./AddPostForm";
import { selectAllPosts } from "../../store/selectors";
import { State } from "../../store/types";

import Article from "./Article";
import { fetchPosts } from "./postsSlice";
import { useAppDispatch } from "../../store/index";

const PostsList = () => {
    const { path } = useRouteMatch();
    const dispatch = useAppDispatch();
    const postsStatus = useSelector((state: State) => state.posts.status);
    const postsError = useSelector((state: State) => state.posts.error);
    const posts = useSelector(selectAllPosts);

    let content;

    useEffect(() => {
        if (postsStatus === "idle") dispatch(fetchPosts());
    }, [dispatch, postsStatus]);

    const sortedPosts = posts
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date));
    const renderedPosts = sortedPosts.map((post) => (
        <Article key={post.id} post={post} path={path} />
    ));

    if (postsStatus === "loading") {
        content = <div>loading...</div>;
    } else if (postsStatus === "succeeded") {
        if (posts.length) {
            content = renderedPosts;
        } else {
            content = <div>No post</div>;
        }
    } else if (postsError) {
        content = <div>{postsError}</div>;
    }
    return (
        <>
            <section className="add-post-form">
                <AddPostForm />
            </section>
            <section className="posts-list">
                <h2>Posts</h2>
                {content}
            </section>
        </>
    );
};

export default PostsList;
