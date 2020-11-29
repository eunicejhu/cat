import React from "react";

export interface TextAreaProps {
    [p: string]: any;
}
const TextArea = (props: TextAreaProps) => <textarea {...props}></textarea>;

export default React.memo(TextArea);
