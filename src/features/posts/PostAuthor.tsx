import React from "react";
import { useSelector } from "react-redux";
import { State } from "../../store";

type Props = { userId: string };
const PostAuthor: React.FC<Props> = ({ userId }: Props) => {
  const author = useSelector((state: State) =>
    state.users.find((user) => user.id === userId)
  );
  return (
    <span className="post-author">
      By {author ? author.name : "Unknown author"}
    </span>
  );
};
export default PostAuthor;
