import styled from 'styled-components';
import { DropdownButtonProps } from './DropdownButton';

export const Container = styled.div`
  display: flex;
  position: relative;
  white-space: nowrap;
`;

export const Button = styled.button<{
  isOpen?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: auto;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid;
  background: white;
  color: ${({ isOpen }): string => (isOpen ? 'blue' : 'black')};
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

export const DropdownMenuContainer = styled.div<{
  openMenuLocation: DropdownButtonProps['menuAlignment'];
}>`
  position: absolute;
  outline: none;
  width: auto;
  border-radius: 8px;
  border: 1px solid;
  background: white;
  right: ${({ openMenuLocation }) => (openMenuLocation === 'right' ? 0 : 'auto')};
  left: ${({ openMenuLocation }) => (openMenuLocation === 'left' ? 0 : 'auto')};
  z-index: 20;
  top: 35px;

  @media only screen and (min-width: 768px) {
    border: 5px solid;
    font-size: 2em;
    top: 65px;
  }
`;

export const DropdownMenu = styled.div`
  margin: 0;
  padding: 8px 20px;
  outline: none;
`;
