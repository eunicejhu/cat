import React from "react";

export interface InputProps {
    [p: string]: any;
}
const Input = (props: InputProps) => <input {...props}></input>;

export default React.memo(Input);
