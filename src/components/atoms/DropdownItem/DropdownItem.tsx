import React, { FC } from 'react';
import { Label, Container } from './DropdownItem.styles';

export interface Props {
  onClick: (e: any) => void;
  /** Label */
  children: string;
  /** Aria label for the DropdownItem */
  ariaLabel: string;
  /** `data-testid` for the DropdownItem */
  testId?: string;
}

const DropdownItem: FC<Props> = ({ onClick, children, ariaLabel, testId }) => {
  return (
    <Container onClick={onClick}>
      <Label data-testid={testId} aria-label={ariaLabel}>
        {children}
      </Label>
    </Container>
  );
};

export default DropdownItem;
