import React from "react";
import getTimeAgo from "../../utils/getTimeAgo";

type Props = { date: string };
const TimeAgo: React.FC<Props> = ({ date }: Props) => {
  let timeAgo = getTimeAgo(date);
  if (timeAgo) {
    timeAgo += " ago";
  }
  return (
    <span className="date">
      {" "}
      <i>{timeAgo}</i>{" "}
    </span>
  );
};
export default TimeAgo;
