import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DropdownItem, { Props } from './DropdownItem';

describe('DropdownItem', () => {
  const mockOnClick = jest.fn();

  const defaultProps: Props = {
    onClick: mockOnClick,
    children: 'Option 1',
    ariaLabel: 'Option 1',
    testId: 'option1-MenuItem',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with the correct label and aria label', () => {
    render(<DropdownItem {...defaultProps} />);
    const dropdownItem = screen.getByTestId('option1-MenuItem');

    expect(dropdownItem).toBeInTheDocument();
    expect(dropdownItem).toHaveTextContent('Option 1');
    expect(dropdownItem).toHaveAttribute('aria-label', 'Option 1');
  });

  it('calls the onClick callback when clicked', () => {
    render(<DropdownItem {...defaultProps} />);
    const dropdownItem = screen.getByTestId('option1-MenuItem');

    fireEvent.click(dropdownItem);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
