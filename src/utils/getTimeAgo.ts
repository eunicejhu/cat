import { parseISO, formatDistanceToNow } from "date-fns";

const getTimeAgo = (dateStr: string): string => {
  if (dateStr) {
    return formatDistanceToNow(parseISO(dateStr));
  }
  return "";
};

export default getTimeAgo;
