import styled from "styled-components";
export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    * {
        margin: var(--margin) 0;
        border-radius: var(--borderRadius);
    }
`;

export const StyledPage = styled.div`
    text-align: center;
    width: 30%;
    min-width: 300px;
    margin: auto;
`;

export const StyledSubmitButton = styled.button`
    width: 50%;
    min-width: 150px;
    margin: auto;
    padding: 10px;
`;
