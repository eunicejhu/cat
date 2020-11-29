import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import TextInput from "./TextInput";

let container;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});
afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

// act(): rendering, user event

it("render a label", () => {
    act(() => {
        render(<p>Email</p>, container);
    });

    // P is a Node instead of HtmlElement, https://developer.mozilla.org/en-US/docs/Web/API/Node
    const P = container.querySelector("p");
    expect(P.textContent).toBe("Email");
});

it("change value when click", () => {
    const handleClick = jest.fn();
    act(() => {
        render(<TextInput type="button" onClick={handleClick} />, container);
    });

    const button = container.querySelector("[type = button]");
    act(() => {
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(handleClick).toHaveBeenCalledTimes(1);
});

it("submit when click", () => {
    const handleSubmit = jest.fn();
    act(() => {
        render(<TextInput type="submit" onClick={handleSubmit} />, container);
    });
    const submit = container.querySelector("input[type=submit]");
    act(() => {
        submit.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(handleSubmit).toHaveBeenCalledTimes(1);
});

// Color TextInput: two events to be used to detect changes to the color value
it("change color when change or input", () => {
    const handleInput = jest.fn();
    const handleChange = jest.fn();

    act(() => {
        render(
            <TextInput
                type="color"
                onInput={handleInput}
                onChange={handleChange}
            />,
            container
        );
    });
    const color = container.querySelector("[type=color]");
    act(() => {
        color.dispatchEvent(new UIEvent("input", { bubbles: true }));
        color.dispatchEvent(new UIEvent("change", { bubbles: true }));
    });
    expect(handleInput).toHaveBeenCalledTimes(1); // input event can trigger onChange
    expect(handleChange).toHaveBeenCalledTimes(2);
});
