import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 15px;
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: auto;
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
