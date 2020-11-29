import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Post } from "./postsSlice";

export interface ArticleProps {
    post: Post;
    path: string;
}
const Article: React.FC<ArticleProps> = ({ post, path }) => {
    return (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <p className="post-content">{post.content.substring(0, 100)}</p>
            <PostAuthor userId={post.userId} />
            <TimeAgo date={post.date} />
            <p>
                <Link to={`${path}posts/${post.id}`}>See more</Link>
            </p>
            <ReactionButtons post={post} />
        </article>
    );
};

export default React.memo(Article);
