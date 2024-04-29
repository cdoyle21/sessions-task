import styled, { css } from 'styled-components';

export const Form = styled.form`
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 0;
`;

const baseCSS = css`
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid;
  background: white;
  user-select: none;
  padding: 8px 8px 8px 8px;

  &:hover {
    color: blue;
  }

  @media only screen and (min-width: 768px) {
    border: 5px solid;
    font-size: 2em;
  }
`;

export const Input = styled.input`
  width: 100%;
  margin-right: 10px;

  ${baseCSS}
`;

export const Button = styled.button`
  width: auto;

  ${baseCSS}
`;
