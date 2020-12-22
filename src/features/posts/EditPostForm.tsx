import React, { useState, useEffect, useCallback } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectPostById } from "../../store/selectors";
import { updatePost, Post } from "./postsSlice";
import { State } from "../../store/index";
import Button from "../../components/buttons/Button";
import Input from "../../components/input/Input";
import TextArea from "../../components/textarea/TextArea";
import { useTheme } from "../../components/Theme";
import StyledForm from "../../components/form/StyledForm";

interface Params {
    id: string;
}
const EditPostForm: React.FC = () => {
    const {
        params: { id },
    } = useRouteMatch<Params>();
    const existingPost = useSelector((state: State) =>
        selectPostById(state, id)
    );
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const dispatch = useDispatch();
    const history = useHistory();

    const { themes, mode } = useTheme();

    useEffect(() => {
        setTitle(existingPost?.title || "");
        setContent(existingPost?.content || "");
    }, [existingPost?.title, existingPost?.content]);

    const onTitleChanged = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value);
        },
        [setTitle]
    );
    const onContentChanged = useCallback(
        (e: React.FormEvent<HTMLTextAreaElement>) => {
            setContent(e.currentTarget.value);
        },
        [setContent]
    );

    const onSavePostClicked = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            if (content && title) {
                dispatch(
                    updatePost({ ...existingPost, title, content } as Post)
                );
                history.push(`/posts/${id}`);
            }
        },
        [content, title, dispatch, existingPost, history, id]
    );

    let renderContent;

    if (!existingPost) {
        renderContent = <div>No post found</div>;
    } else {
        renderContent = (
            <StyledForm>
                <h2>Edit Post</h2>
                <div className="field">
                    <label htmlFor="title">Title</label>
                    <Input
                        id="title"
                        data-testid="title"
                        name="title"
                        type="text"
                        value={title}
                        onChange={onTitleChanged}
                    />
                </div>
                <div className="field">
                    <label htmlFor="content">Content</label>
                    <TextArea
                        name="content"
                        id="content"
                        data-testid="content"
                        cols={30}
                        rows={10}
                        value={content}
                        onChange={onContentChanged}
                    ></TextArea>
                </div>
                <div className="field">
                    <Button
                        themes={themes}
                        mode={mode}
                        value="Submit"
                        onClick={onSavePostClicked}
                    >
                        Submit
                    </Button>
                </div>
            </StyledForm>
        );
    }
    return renderContent;
};

export default EditPostForm;
