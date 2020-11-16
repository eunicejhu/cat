import { sub, parseISO } from "date-fns";

export const NOW = "2020-11-15T16:16:08.493Z";
export const TIME_AGO = "28 minutes";
export const INITIAL_STATE = {
  posts: [
    {
      id: "1",
      title: "First test Post!",
      content: "test!",
      userId: "1",
      date: sub(parseISO(NOW), { days: 1 }).toISOString(),
    },
    {
      id: "2",
      title: "Second test Post",
      content: "test",
      userId: "0",
      date: sub(parseISO(NOW), { days: 5 }).toISOString(),
    },
  ],
  users: [
    { id: "0", name: "Tianna Jenkins" },
    { id: "1", name: "Kevin Grant" },
    { id: "2", name: "Madison Price" },
  ],
};

export default { INITIAL_STATE };
