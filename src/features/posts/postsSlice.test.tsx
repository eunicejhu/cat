import { store } from "../../test/store";
import { postAdded, postUpdated, reactionAdded } from "./postsSlice";

it("initial values", () => {
  const initialPosts = store.getState().posts;
  expect(initialPosts[0].id).toBe("1");
  expect(initialPosts[1].title).toBe("Second test Post");
});
it("postAdded test", () => {
  store.dispatch(
    postAdded({ title: "title 3", content: "Content 3", userId: "1" })
  );
  expect(store.getState().posts.length).toBe(3);
});
it("postUpdated test", () => {
  store.dispatch(
    postUpdated({
      id: "1",
      title: "Love, laugh, eat",
      content: "Hahaha",
    })
  );
  const existingPost = store.getState().posts.find((post) => post.id === "1");
  expect(existingPost?.title).toBe("Love, laugh, eat");
});
it("reactionAdded test", () => {
  store.dispatch(reactionAdded({ postId: "1", reaction: "heart" }));
  const existingPost = store.getState().posts.find((post) => post.id === "1");
  expect(existingPost?.reactions["heart"]).toBe(5);
});
