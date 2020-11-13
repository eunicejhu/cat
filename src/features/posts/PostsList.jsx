import React from "react";
import { useSelector } from "react-redux";

const PostsList = () => {
  const posts = useSelector((state) => state.posts);
  const renderPosts =
    posts &&
    posts.map((post) => (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <p className="post-content">{post.content}</p>
      </article>
    ));

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {posts && posts.length ? renderPosts : "No posts"}
    </section>
  );
};

export default PostsList;
